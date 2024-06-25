// 4.6 - Express app with Mustache templates and dynamic urls
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 3000;

// Set the view engine for express to use Handlebars
// The templates are stored by default in the /views directory.
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs', // Default extension is '.handlebars'. We are specifying the file extension as '.hbs' for brevity
    defaultLayout: false, // We don't use a "layout" template to wrap this template
  })
);
app.set('view engine', 'hbs');

// Index page
app.get('/', function (req, res) {
  res.render('index');
});

// User page with dynamic userId parameters from url
app.get('/user/:userId', function (req, res) {
  const userId = req.params.userId; // This gets the userId from the request url
  res.render('user', { userId: userId });
});

// Hello page with username extracted from query parameters
// These are everything that comes after the "?" in a url
app.get('/hello', function (req, res) {
  const name = req.query.name || 'Anonymous User';
  console.log(`query parameters: `, req.query);
  res.render('hello', { username: name });
});

app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});