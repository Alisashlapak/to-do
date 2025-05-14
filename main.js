const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'pages')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'main.html'));
  });

app.listen(3000);

// 🔌 Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/brodb')
  .then(() => console.log('✅ Підключено до MongoDB'))
  .catch((err) => console.error('❌ Помилка підключення:', err));

const noteSchema = new mongoose.Schema({
  textcontent: { type: String, required: true },
  noteDate: { type: Date, default: Date.now } 
});

// 🔨 Модель
const Note = mongoose.model('Note', noteSchema);

app.use(bodyParser.json());

app.post('/add-note', async (req, res) => {
  const { text } = req.body;
  try {
    const newNote = new Note({ textcontent: text });
    await newNote.save();
    res.status(201).json({ message: 'Note saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving note', error });
  }
});


