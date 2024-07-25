const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

import {PORT} from './config.js';
import blogsRouter from './routes/blogsRouter.js';

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//blog routes
app.use('/blogs', blogsRouter);

//index route
app.get('/', (req, res) => {
    res.send('Hello from index page');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})