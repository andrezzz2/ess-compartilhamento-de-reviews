module.exports = databaseController => {

    const express = require("express");
    const cors = require('cors');
    class AppController {

        constructor(databaseController) {

            this.express = express();
            this.middlewares();
            this.routes(databaseController);
            
        }

        middlewares() {

            this.express.use(express.json()); // for parsing application/json
            this.express.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
            this.express.use(cors());
            this.express.use(this.errorHandler);

        }

        routes(databaseController) {

            this.express.use('/', require('./routes')(databaseController));

        }

        errorHandler(err, req, res, next) {

            if (res.headersSent) return next(err);

            res.status(500).send({message: err});

        }

    }

    return new AppController(databaseController).express;
}
    