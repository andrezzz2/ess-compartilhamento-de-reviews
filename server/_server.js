require('dotenv/config');

//Create and connect to the database
const DatabaseController = require('./_database');
const databaseController = new DatabaseController(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);

console.log("Trying to connect to the database");

databaseController.connect().then(response => {

    console.log(response.message);
    if(response.message==="Connected to the database."){

        // Create the express app
        const app = require('./_app')(databaseController);
        // Start server
        const port = 8080;
        const host = "localhost";
        app.listen(port, host, function (err) {

            if (err) {

                return console.error(err);

            } else {

                console.log(`server running on "${host}:${port}"`);

            }

        });

    }
    
});