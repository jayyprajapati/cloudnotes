const express = require("express");
const router = express.Router();
const Notes = require("../Models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// –––––––––––––––––––––––––– Route: 1 READ ––––––––––––––––––––––––––
// GET all notes of a user via GET("/api/notes/allnotes"). Login required
router.get("/allnotes", fetchuser, async (req, res) => {
  try {
    let notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
});

// ––––––––––––––––––––––––––Route: 2 CREATE ––––––––––––––––––––––––––
// Add new note of a user via POST("/api/notes/addnote"). Login required
router.post(
  "/addnote",
  // to validate the user data
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 6 }),
  ],
  fetchuser,
  async (req, res) => {
    // check for the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
);

// ––––––––––––––––––––––––––Route: 3 UPDATE ––––––––––––––––––––––––––
// UPDATE note of a user via PUT("/api/notes/updatenote/:id"). Login required

// Here the id in the URL is note id and not the user id.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not Authorized");

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
});

// ––––––––––––––––––––––––––Route: 4 DELETE ––––––––––––––––––––––––––
// DELETE note of a user via DELETE("/api/notes/deletenote/:id"). Login required

// Here the id in the URL is note id and not the user id.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not Authorized");

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({
      Success: "Note has been Successfully Deleted",
      title: note.title,
      id: note.id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
});
module.exports = router;
