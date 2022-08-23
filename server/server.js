const express = require('express');
const cors = require('cors');

// Create the express app
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());


const routes = require('./routes');
app.use('/', routes);


const port = 8080;
const host = "localhost";
// Start server
app.listen(port, host,  function (err) {
    if (err) {
        return console.error(err);
    }
    console.log(`server running on "${host}:${port}"`);
});

