import express from 'express';  
import bodyParser from 'body-parser';  
import cors from 'cors';  
import morgan from "morgan";
import {PORT} from './config.js';
import blogsRouter from './routes/blogsRouter.js';
import usersRouter from './routes/usersRouter.js';
import db from './db/dbconn.js';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined'));


//blog routes
app.use('/blogs', blogsRouter);

//user routes
app.use('/users', usersRouter);

//index route
app.get('/', (req, res) => {
    res.send('Hello from index page');
});


const startServer = async () => {
    try {
        //ensure database is initialized
        await db.connect();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();