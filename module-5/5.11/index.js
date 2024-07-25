import express from 'express';  
import mongoose from 'mongoose';  
import bodyParser from 'body-parser';  
import cors from 'cors';  
import morgan from "morgan";
import {PORT, MONGO_URI, MONGO_DB_NAME} from './config.js';
import blogsRouter from './routes/blogsRouter.js';
import usersRouter from './routes/usersRouter.js';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined'));

mongoose
    .connect(`${MONGO_URI}/${MONGO_DB_NAME}`)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error", err));

//blog routes
app.use('/blogs', blogsRouter);

//user routes
app.use('/users', usersRouter);

//index route
app.get('/', (req, res) => {
    res.send('Hello from index page');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${PORT}`);
})