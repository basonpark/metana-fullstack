import express from 'express';
const usersRouter = express.Router();
import {
    users,
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    getUserByEmail,
} from '../data/user.js';

//get all users
usersRouter.get('/', (req, res) => {
    const data = getUsers();
    res.json(data);
});

//get single user
usersRouter.get('/:id', (req, res) => {
    const {id} = req.params;
    const user = getUserById(id);
    if (!user) {
        return res.status(404).json({error: 'user not found'});
    }
    res.status(200).json(user);
});

//post new user
usersRouter.post('/', (req, res) => {
    try {
        const {name, email, role} = req.body;
        if (!name || !email) {
            throw new Error('name or email is empty');
        }
        const existing = getUserByEmail(email);
        if (!!existing) {
            throw new Error('email already exists');
        }
        const user = addUser({name, email, role});
        console.log('posted user: ', user);
    }
    catch (err) {
        return res.status(400).json({
            error: err.toString(),
        });
    }
    res.json(users);
});

//update single user
usersRouter.put('/:id', (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, role} = req.body;
        if (!id || !name || !email) {
            throw new Error('id, name or email is empty');
        }
        const existing = getUserById(id);
        if (!existing) {
            throw new Error(`user with id ${id} not found`);
        }
        const updated = updateUser({id, name, email, role});
        console.log(`updated user: ${updated}`);
        res.status(200).json(updated);
    } catch (err) {
        return res.status(400).json({
            error: err.toString(),
        });
    }
});


//delete single user
usersRouter.delete('/:id', (req, res) => {
    try {
        const {id} = req.params;
        const user = getUserById(id);
        if (!user) {
            throw new Error(`user with id ${id} not found`);
        }
        const deleted = deleteUser(user);
        console.log(`deleted user: ${deleted}`);
        res.status(200).json(deleted);
    } catch (err) {
        return res.status(400).json({
            error: err.toString(),
        });
    }
});

export default usersRouter;