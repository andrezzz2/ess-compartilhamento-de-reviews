const express = require("express");
const cors = require('cors');
require('dotenv/config');

class AppController {

    constructor() {

        this.express = express();
        this.middlewares();
        this.routes();

    }

    middlewares() {

        this.express.use(express.json()); // for parsing application/json
        this.express.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        this.express.use(cors());

    }

    routes() {

        this.express.use('/', require('./routes'));

    }

    db() {

    }


}

module.exports = new AppController().express;