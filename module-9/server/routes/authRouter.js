//router for contact methods
import express from 'express';
const authRouter = express.Router();
import {login, logout} from '../controllers/auth.js';

//log in with email and password
authRouter.post('/login', async (req, res) => {
    const {email, password } = req.body;
    try {
        await login({res, email, password});
        res.status(200).json({success: true, message: 'login successful'});
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});

//log out
authRouter.post('/logout', async(req, res) => {
    try {
        await logout(res);
        res.status(200).json({success: true, message: 'logout successful'});
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});

export default authRouter;