const Note = require('../models/noteModel');

// Get all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new note
const createNote = async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({
    title,
    content,
  });

  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, lastEdited: Date.now() },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    await Note.findByIdAndDelete(id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};