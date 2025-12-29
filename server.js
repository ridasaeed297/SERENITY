const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/serenityDB')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

// Model
const Contact = mongoose.model('Contact', ContactSchema);

// Route
app.post('/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving message' });
  }
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
