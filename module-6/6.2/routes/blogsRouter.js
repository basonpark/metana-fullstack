// Routes for the Blogs API
import express from 'express';
import Blog from '../models/Blog.js';
const blogsRouter = express.Router();
import mongoose from "mongoose";

// Get all blogs
blogsRouter.get('/', (req, res) => {
  try {
    const blogs = Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single blog
blogsRouter.get('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found'});
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post new blog
blogsRouter.post('/', async (req, res) => {
  try {
    const {title, content} = req.body;
    const newBlog = new Blog({title, content});
    await newBlog.save();
    res.status(201).json(newBlog);
} catch (error) {
  res.status(400).json({error: error.message});
}
});

// Update single blog
blogsRouter.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {title, content} = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(id, {title, content}, {new: true});
    if (!updatedBlog) {
      return res.status(404).json({error: 'Blog not found'});
    }
    res.json(updatedBlog);
} catch (error) {
  res.status(400).json({error: error.message});
}
});

// Delete single blog
blogsRouter.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json(deletedBlog);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

export default blogsRouter;