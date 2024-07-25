import express from 'express';  
import bodyParser from 'body-parser';  
import cors from 'cors';  
import morgan from "morgan";
import {PORT} from './config.js';
import blogsRouter from './routes/blogsRouter.js';
import usersRouter from './routes/usersRouter.js';
import {connectToDatabase} from './db/dbconn.js';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined'));

connectToDatabase();

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