const express = require('express');
const jwt = require('jsonwebtoken');
const controller = require('../controller/index');

const router = express.Router();

router.post('/login', controller.login);
router.post('/signup', controller.signUp);
router.get('/user/getinfo/:username', controller.getInfo);  //public info
router.get('/user/getmyinfo', verifyJWT, controller.getMyInfo);  //private route, private info
router.post('/user/update/:username', verifyJWT, controller.updateUser);   //private route
router.put('/user/delete/:username', verifyJWT, controller.deleteUser);    //private route
router.get('/user/refreshsession', verifyJWT, controller.refreshSession);  //private route


function verifyJWT(req, res, next){
    
    const token = req.headers['session-token'];

    if (!token) 
        return res.send({auth: false, user: null, message: 'No token provided.'});
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) 
            return res.send({auth: false, user: null, message: 'Invalid token or it has expired.'});

        req.body.username = decoded.username;
        next();
    });

}


module.exports = router;

  
