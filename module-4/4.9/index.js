// 4.9 - Express app with Handlebars layout templates and partials and static directory
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 3000;


// Set the view engine for express to use Handlebars
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main', // this looks for a template called "main" in the /views/layouts folder
  extname: '.hbs' // We're specifying the file extension as '.hbs' for brevity
}));

app.set('view engine', 'hbs');
app.use(express.static('public')) // This sets a static directory for static assets such as CSS files, Javascript, and images

// Index page
app.get('/', function (req, res) {
  res.render('index');
});

// User page with dynamic userId parameters from url
// The '?' means we may not receive this parameter; (eg: localhost:3000/user) but we should still render the route.
app.get('/users/:userId?', function (req, res) {
  const users = [
    { userId: 1, name: 'John', email: 'john@example.com' },
    { userId: 2, name: 'Jack', email: 'jack@example.com' },
    { userId: 3, name: 'Sara', email: 'sara@example.com' },
    { userId: 4, name: 'Lily', email: 'lily@example.com' },
    { userId: 4, name: 'Susan', email: 'susan@example.com' },
  ]
  // Get the userId from the request url
  const userId  = req.params.userId; 
  
  // Filter the users array for a matching user by ID. 
  var user = users.find((u) => u.userId.toString() === userId) // Note that the 'userId' parameter will be a string, not an integer.
  console.log(`userId: `, userId);
  console.log(`user: `, user);
  res.render('user', {user: user});
});

// Hello page with username extracted from query parameters
// These are everything that comes after the "?" in a url
app.get('/hello', function (req, res) {
  const name = req.query.name || "Anonymous User" 
  console.log(`query parameters: `, req.query);
  res.render('hello', {username: name});
});

// A page with an image
app.get('/kitten', function (req, res) {
  res.render('centered-image', {
    imagePath: 'kitten.jpg',
    description: 'A cute kitten',
  });
});


// A page with an image
app.get('/dog', function (req, res) {
  res.render('centered-image', {
    imagePath: 'dog.jpg',
    description: 'A cute dog',
  });
});



app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});