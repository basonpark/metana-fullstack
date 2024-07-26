import express from 'express';
const usersRouter = express.Router();
import User from '../models/User.js';
import mongoose from "mongoose";

//get all users
usersRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//get single user
usersRouter.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({error: 'user not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//post new user
usersRouter.post('/', async (req, res) => {
    try {
        const {name, email, role} = req.body;
        const newUser = new User({name, email, role});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//update single user
usersRouter.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, role} = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, {name, email, role}, {new: true});
        if (!updatedUser) {
            return res.status(404).json({error: 'user not found'});
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


//delete single user
usersRouter.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

export default usersRouter;