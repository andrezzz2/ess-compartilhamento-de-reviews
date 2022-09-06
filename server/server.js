const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

// Create the express app
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());



// Routes
const routes = require('./routes');
app.use('/', routes);



// DB Connection
const username = "andrezzz";
const password = "cYpESd998gsV0I0x";
const cluster = "cluster0.19wkpiv";
const dbName = "ReviewShare";

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`, { 
    authSource: "admin",
    useNewUrlParser : true,
    useUnifiedTopology: true },
    err => {
        if(err)
            console.log(err);
        else 
            console.log('Connected to the database');
    }
);



// Start server
const port = 8080;
const host = "localhost";
app.listen(port, host,  function (err) {
    if (err) {
        return console.error(err);
    }
    console.log(`server running on "${host}:${port}"`);
});

