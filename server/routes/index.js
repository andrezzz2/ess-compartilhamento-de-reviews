const express = require('express');
const controller = require('../controller/index');

const router = express.Router();

router.post('/login', controller.login);
router.post('/signup', controller.signUp);
router.get('/user/getfollowers/:username', controller.getFollowers);
router.get('/user/getfollowing/:username', controller.getFollowing);
router.post('/user/getmyinfo', controller.getMyInfo);
router.get('/user/getinfo/:username', controller.getInfo);
router.post('/user/update/:username', controller.updateUser);
router.put('/user/delete/:username', controller.deleteUser);
router.get('/user/history/:username', controller.history);
router.post('/user/alive', controller.alive);


module.exports = router;

  
