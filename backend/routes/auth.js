const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = 'iNoteBookSecret';
//Getting post request for new User Creation. 

router.post(
  "/auth/user",
  [
    //Validation Creteria  
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

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
        const secPass = await bcrypt.hash(req.body.password,salt);

        //Creating new user into Database.
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        const data = {
            userId:{
                id : user.id,
            }
        }

        //Creating JWT and sending it to user.
        const authtoken = jwt.sign(data, JWT_Secret);

        res.json({authtoken});

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error occured.");
    }
  }
);

module.exports = router;
