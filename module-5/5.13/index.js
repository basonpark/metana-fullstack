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

// Debugging: Print Environment Variables  
console.log('MONGO_URI:', MONGO_URI);  
console.log('MONGO_DB_NAME:', MONGO_DB_NAME);  

// Ensure environment variables are read correctly  
if (!MONGO_URI) {  
    throw new Error('MONGO_URI is not defined in .env file');  
}  
if (!MONGO_DB_NAME) {  
    throw new Error('MONGO_DB_NAME is not defined in .env file');  
}  

// Construct Connection String  
const connectionString = `${MONGO_URI}/${MONGO_DB_NAME}`;  

// Debugging: Print the Constructed Connection String  
console.log('Constructed MongoDB Connection String:', connectionString);  

// Connect to MongoDB  
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })  
    .then(() => console.log('Database connected!'))  
    .catch(err => console.error('Database connection error:', err));  

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