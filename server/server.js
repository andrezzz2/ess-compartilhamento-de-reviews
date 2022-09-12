const database = require('./database');

// Create the express app
const app = require('./app');

// Start server
const port = 8080;
const host = "localhost";
app.listen(port, host,  function (err) {

    if (err) {

        return console.error(err);

    } else {

        console.log(`server running on "${host}:${port}"`);
        database.connect();
    }

});

