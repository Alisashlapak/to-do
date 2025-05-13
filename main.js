const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

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

bro.save()
  .then(() => {
    console.log('🙌 Юзера збережено!');
    mongoose.disconnect(); // відключимось після збереження
  })
  .catch((err) => {
    console.error('❌ Помилка збереження:', err);
  });
