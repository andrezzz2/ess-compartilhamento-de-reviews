const mongoose = require('mongoose');

class DatabaseController {

    constructor (username, password, cluster, dbName) {

        this.username = username;
        this.password = password;
        this.cluster = cluster;
        this.dbName = dbName;
        this.conn = new mongoose.Connection();
        
    }

    async connect () {
        
        const response = {message: "initialState"};

        try {

            //desconectado ou não inicializado
            if(this.conn.readyState === 0 || this.conn.readyState === 99){

                this.conn = await mongoose.createConnection(`mongodb+srv://${this.username}:${this.password}@${this.cluster}.mongodb.net/${this.dbName}?retryWrites=true&w=majority`, { 
                    authSource: "admin",
                    useNewUrlParser : true,
                    useUnifiedTopology: true }
                ).asPromise();

                response.message = "Connected to the database."
            }

        } catch(err) {

            response.message = String(err);

        }

        return response;

    }

    disconnect () {

        this.conn.close();
        
    }

    isConnected() {

        if (this.conn.readyState === 1) return true;
        else return false;

    }
    
}

module.exports = DatabaseController;