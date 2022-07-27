const express = require('express');
const controller = require('../controller/index');

const router = express.Router();

router.get('/teste', controller.teste);

module.exports = router;

  
