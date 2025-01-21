//router for contact methods
import express from 'express';
const authRouter = express.Router();
import {login} from '../controllers/auth.js';

//log in with email and password
authRouter.post('/login', async (req, res) => {
    try {
        const {user, token} = await login({req, res});
        res.status(200).json({success: true, message: 'login successful', data: { user, token,}});
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});


export default authRouter;