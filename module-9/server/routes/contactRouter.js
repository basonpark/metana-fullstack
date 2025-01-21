import express from 'express';
import { handleSubmitContact } from '../controllers/contact.js';
const contactRouter = express.Router();

contactRouter.post('/', async(req, res) => {
    const {email, firstName, lastName, comments} = req.body;
    try {
        await handleSubmitContact({email, firstName, lastName, comments});
        res.status(200).json({success: true});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

export default contactRouter;