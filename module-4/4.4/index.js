const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});