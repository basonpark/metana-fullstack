const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

import { blogs, blogsFindById, newBlog, addBlog, blogsUpdateById, deleteBlog } from './blogs.js';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/blogs', (req, res) => {
    res.json(blogs);
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const blog = blogsFindById(id);
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
        const blog = newBlog({title, content});
        addBlog(blog);
        console.log('posted blog: ', blog);
    } catch (err) {
        return res.status(400).json({
            error: err.toString(),
        });
    }
    res.json(blogs);
});


app.put('/blogs/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const {title, content} = req.body;
        if (!title || !content) {
            throw new Error("Title or content is empty");
        }
        const existing = blogsFindById(id);
        const updated = {...existing, id, title, content};
        blogsUpdateById(updated);
        console.log(`updated blog: ${updated}`);
        res.status(200).json(updated);
    } catch (err) {
        return res.status(400).json({
            error: err.toString(),
        });
    }
});

app.delete('/blogs/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        deleteBlog(id);
        res.status(200).send(`blog with id ${id} deleted`);
    } catch (err) {
        return res.status(400).json({
            error: err.toString(),
        });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})