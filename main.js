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

// 📦 Схема юзера
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, unique: true }
});

// 🔨 Модель
const User = mongoose.model('User', userSchema);

// ➕ Додавання нового юзера
const bro = new User({
  name: 'Бро',
  age: 18,
  email: 'bro@example.com'
});

bro.save()
  .then(() => {
    console.log('🙌 Юзера збережено!');
    mongoose.disconnect(); // відключимось після збереження
  })
  .catch((err) => {
    console.error('❌ Помилка збереження:', err);
  });
