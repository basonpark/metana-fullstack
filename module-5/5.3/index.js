const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Dummy blog posts
var blogs = [
    { id: 1, title: 'Blog post 1', content: 'Example blog post 1.' },
    { id: 2, title: 'Blog post 2', content: 'Example blog post 2.' },
    { id: 3, title: 'Blog post 3', content: 'Example blog post 3.' },
    { id: 4, title: 'Blog post 4', content: 'Example blog post 4.' },
  ];

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/blogs', (req, res) => {
    res.json(blogs);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})