import express from 'express';
import User from '../models/User.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const usersRouter = express.Router();

const SALT_ROUNDS = 10;
// Get all users
usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single user by mongodb _id
usersRouter.get('/:id', async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id); // Convert id to ObjectId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post new user
usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
        throw new Error('all fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({ name, email, role, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update single user
usersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
        throw new Error('all fields are required');
    }

    //validate current user has rights to update this user
    if (role) {
      const prevUser = User.findOne({email: email});
      if (prevUser && prevUser.role !== role) {
        console.log('=== user has no rights to update this user');
      }
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role, hashedPassword },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete single user
usersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default usersRouter;
