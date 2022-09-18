module.exports = database => {

    const express = require("express");
    const cors = require('cors');
    class AppController {

        constructor(database) {

            this.express = express();
            this.middlewares();
            this.routes(database);
        }

        middlewares() {

            this.express.use(express.json()); // for parsing application/json
            this.express.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
            this.express.use(cors());

        }

        routes(database) {

            this.express.use('/', require('./routes')(database));

        }

    }

    return new AppController(database).express;
}
    