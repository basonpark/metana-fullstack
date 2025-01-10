// Routes for the Blogs API
import express from 'express';
import db from '../db/dbconn.js';
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../db/blogQueries.js';
const blogsRouter = express.Router();

// Get all blogs
blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single blog
blogsRouter.get('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await getBlogById(blogId);
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
    const {title, content, user_id} = req.body;
    const blog = await createBlog(title, content, user_id);
    res.status(201).json(blog);
} catch (error) {
  res.status(400).json({error: error.message});
}
});

// Update single blog
blogsRouter.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {title, content} = req.body;
    const blog = await updateBlog(id, title, content);
    if (!blog) {
      return res.status(404).json({error: 'Blog not found'});
    }
    res.json(blog);
} catch (error) {
  res.status(400).json({error: error.message});
}
});

// Delete single blog
blogsRouter.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const blog = await deleteBlog(id);
    if (!blog) {
      return res.status(404).json({error: 'Blog not found'});
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

export default blogsRouter;