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

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const blog = blogs.find(blog => blog.id == id);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404).send('Blog not found');
    }
});

app.post('/blogs', (req, res) => {
    try {
        const {title, content } = req.body;
        if (!title || !content) {
            throw new Error("Title or content is empty");
        }
        const lastId = blogs[blogs.length - 1]?.id || 0;
        const blog = {
            id: lastId + 1,
            title, 
            content,
        };
        blogs.push(blog);
        console.log('posted blog: ', blog);
    } catch (err) {
        return res.status(400).json({
            error: err.toString(),
        });
    }
    res.json(blogs);
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})