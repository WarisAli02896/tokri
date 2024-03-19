require('dotenv').config();
const express = require("express");
var bodyParser = require('body-parser');
const route = require('./route/route');
const port = process.env.SERVER_PORT

//Database connection
require('./data/models/loadModels')

//Object for Express Class
const app = express()

//Plugins for express routing
app.use(bodyParser.json());

//Setting up routes
app.use('/fyp',
    route.auth,
    route.shops
)

//Initiate Application on port 3000
app.listen(port, () => {
    console.log(`Server is running on port no ${port}`)
});
