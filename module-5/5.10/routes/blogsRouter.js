// Routes for the Blogs API
import express from 'express';
const blogsRouter = express.Router();
import {
  blogs,
  addBlog,
  deleteBlog,
  updateBlog,
  blogsFindById,
} from '../data/blogs.js';

// All these routes will be scoped under /api/blog in index.js

// Get all blogs
blogsRouter.get('/', (req, res) => {
  res.json(blogs);
});

// Get single blog
blogsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const blog = blogsFindById(id);
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' });
  }
  res.status(200).json(blog);
});

// Post new blog
blogsRouter.post('/', (req, res) => {
  try {
    const { title, content } = req.body;
    // Validate content
    if (!title || !content) {
      throw new Error('title or content is empty');
    }
    const blog = addBlog({ title, content });
    console.log('posted blog: ', blog);
  } catch (err) {
    return res.status(400).json({
      error: err.toString(),
    });
  }
  res.json(blogs);
});

// Update single blog
blogsRouter.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    // Validate content
    if (!title || !content) {
      throw new Error('title or content is empty');
    }
    const existing = blogsFindById(id);
    if (!existing) {
      throw new Error(`blog with id ${id} not found`);
    }
    // Update the record
    const updated = updateBlog({ id, title, content });
    console.log(`updated blog: ${updated}`);
    res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({
      error: err.toString(),
    });
  }
});

// Delete single blog
blogsRouter.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const blog = blogsFindById(id);
    deleteBlog(id);
    console.log(`deleted blog: ${id}`);
    res.status(200).json(blog || {}); // return the deleted blog JSON if there was a record
  } catch (err) {
    return res.status(400).json({
      error: err.toString(),
    });
  }
});

export default blogsRouter;