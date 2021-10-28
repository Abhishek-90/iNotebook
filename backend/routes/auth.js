const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_Secret = "iNoteBookSecret";
const fetchuser = require('../middleware/fetchuser');

//Getting post request for new User Creation.
router.post(
  "/user",
  [
    //Validation Creteria
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //Checking for errors in the user entered data. Validating user data.
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      //Checking if entered userId is already being used.

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ errorMessage: "Email Id already Used" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Creating new user into Database.
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        userId: {
          id: user.id,
        },
      };

      //Creating JWT and sending it to user.
      const authtoken = jwt.sign(data, JWT_Secret);

      res.json({ authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error occured.");
    }
  }
);

//API Endpoint for user login.
router.post(
  "/login",
  [
    body("email", "Enter Valid Email Id").isEmail(),
    body("password", "Enter Password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //Checking if entered Credentials have any errors. Returning error list if any.
    if (!errors.isEmpty()) {
      res.status(400).send({ errors });
    }

    let { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ Message: "Enter Correct Credentials" });
      }

      let passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ Message: "Enter Correct Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      //Creating JWT and sending it to user.
      const authtoken = jwt.sign(data, JWT_Secret);

      return res.json({ authtoken });
    } 
    catch (error) {
        res.status(500).json({error});
    }
  }
);

//ROUTE 3: Getting user Id from auth token. Login Required.

router.post('/getuser',fetchuser,async (req,res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).send({user});
    }
    catch(error){
        res.status(500).send({error});
    }
});

module.exports = router;
