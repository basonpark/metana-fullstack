const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/hello', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'hello.html'));
});

app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});