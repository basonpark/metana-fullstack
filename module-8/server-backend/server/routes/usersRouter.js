import express from 'express';
const usersRouter = express.Router();
import db from '../db/dbconn.js';

//get all users
usersRouter.get('/', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//get single user
usersRouter.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'user not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//post new user
usersRouter.post('/', async (req, res) => {
    try {
        const {name, email, role} = req.body;
        const result = await db.query("INSERT INTO users (name, email, role, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *", [name, email, role]);
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'user not found'});
        }
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//update single user
usersRouter.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, role} = req.body;
        const result = await db.query("UPDATE users SET name = $1, email = $2, role = $3, updated_at = NOW() WHERE id = $4 RETURNING *", [name, email, role, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'user not found'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


//delete single user
usersRouter.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

export default usersRouter;