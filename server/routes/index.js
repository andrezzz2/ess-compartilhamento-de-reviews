const express = require('express');
const controller = require('../controller/index');

const router = express.Router();

router.post('/login', controller.login);
router.post('/signup', controller.signUp);
router.get('/user/getfriends/:id', controller.getFriends);
router.get('/user/getinfo/:id', controller.getInfo);
router.post('/user/update/:id', controller.updateUser);
router.put('/user/delete/:id', controller.deleteUser);
router.get('/user/history/:id', controller.history);


module.exports = router;

  
