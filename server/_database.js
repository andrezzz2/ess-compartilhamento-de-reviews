const mongoose = require('mongoose');
require('dotenv/config');


class Database {

    constructor () {

        this.username = process.env.DB_USERNAME;
        this.password = process.env.DB_PASSWORD;
        this.cluster = process.env.DB_CLUSTER;
        this.dbName = process.env.DB_NAME;
        
    }

    connect () {

        mongoose.connect(`mongodb+srv://${this.username}:${this.password}@${this.cluster}.mongodb.net/${this.dbName}?retryWrites=true&w=majority`, { 
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

    }

    disconnect () {

        mongoose.connection.close();
        
    }
    
}

module.exports = new Database();