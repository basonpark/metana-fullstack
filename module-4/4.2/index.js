// Express app with HTML and content-type header.
const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html')
  res.send('<h1>Hello, world!</h1><p>This is a hello world with content-type HTML header.');
});

app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});