const mongoose = require('mongoose');

const mongodb = {

    connect : function () {
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
    }
    
}

module.exports = mongodb;