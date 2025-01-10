import express from 'express';
const usersRouter = express.Router();
import db from '../db/dbconn.js';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../db/userQueries.js';

//get all users
usersRouter.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//get single user
usersRouter.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await getUserById(id);
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
        const user = await createUser(name, email, role);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//update single user
usersRouter.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, role} = req.body;
        const user = await updateUser(id, name, email, role);
        if (!user) {
            return res.status(404).json({error: 'user not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


//delete single user
usersRouter.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await deleteUser(id);
        res.json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

export default usersRouter;