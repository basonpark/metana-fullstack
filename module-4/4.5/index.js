// 4.5 - Express app with Handlebars templates
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 3000;

// Set the view engine for express to use Handlebars
// The templates are stored by default in the /views directory.
// This expects a layout file in '/views/layouts called 'main.hbs"
app.engine('hbs', exphbs.engine({
  extname: '.hbs', // Default extension is '.handlebars'. We are specifying the file extension as '.hbs' for brevity
  defaultLayout: false, // We don't use a "layout" template to wrap this template
}));
app.set('view engine', 'hbs');

// Index page
app.get('/', function (req, res) {
  res.render('index');
});

// Hello page - Sam
app.get('/hello-sam', function (req, res) {
  res.render('hello', {username: "Sam"});
});

// Hello page - Sue
app.get('/hello-sue', function (req, res) {
  res.render('hello', {username: "Sue"});
});

// Hello page - Tom
app.get('/hello-tom', function (req, res) {
  res.render('hello', {username: "Tom"});
});
// Hello page - Jerry
app.get('/hello-jerry', function (req, res) {
  res.render('hello', {username: "Jerry"});
});

app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});