require('dotenv').config();
const express = require("express");
var bodyParser = require('body-parser');
const port = process.env.SERVER_PORT

//Database connection
// require('./utils/sequlize');

//Object for Express Class
const app = express()

//Plugins for express routing
app.use(bodyParser.json());

//Defining routes
const auth = require('./route/auth')
//Seeting up routes
app.use('/fyp',
    auth
)

//Initiate Application on port 3000
app.listen(port, () => {
    console.log(`Server is running on port no ${port}`)
})