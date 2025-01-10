const express = require('express');
const app = express();
const path = require('path');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});