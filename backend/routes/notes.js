const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all notes of Authenticated users. Login Required. POST
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch {
    return res.status(400).send("Invalid");
  }
});

//Route 2: Add New Notes from users: Post: /notes/addnote: Login Required.
router.post(
  "/addnotes",
  fetchuser,
  [
    //Validation Creteria
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //Checking for errors in the user entered data. Validating user data.
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const userid = req.user.id;

    try {
      //Creating a new user specific Note.
      const note = await Notes.create({
        user: userid,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });

      //Returning result i.e. added note
      res.status(200).json({ note });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
);

//ROUTE 3:(PUT) Endpoint to update contents of existing note.
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
    const noteId = req.params.id;
    const {title,description, tag} = req.body;
    //Creating new Note object with new Data
    const newNote = {};
    
    if(title) {newNote.title = title;}
    if(description) {newNote.description = description;}
    if(tag) {newNote.tag = tag;}
    
    let note = await Notes.findById(noteId);
    if(!note) {return res.status(404).send("Not Found");} //checking if note exists
    // console.log(note.user);
    // console.log(req.user.id);

    if(note.user.toString() !== req.user.id) {return res.status(401).send("Not Allowed");} // checking if user is allowed to modify this note

    note = await Notes.findByIdAndUpdate(noteId, {$set: newNote},{new: true}); //updating the existing note with new Note

    return res.status(200).json({note});

});

//ROUTE 4: Endpoint to Delete Existing note entirely. DELETE:/deletenote/:id. Login Required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{
        let note = await Notes.findById(req.params.id);
        
        //checking if note exists
        if(!note) {
            return res.status(404).send("Not Found");
        }
        // checking if user is allowed to delete this note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        
        await Notes.findByIdAndDelete(req.params.id);

        return res.send(`${req.params.id} Deleted`);
    }
    catch(error){
        return res.status(500).json({error});
    }    
    
}) 

module.exports = router;
