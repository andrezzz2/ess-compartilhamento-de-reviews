const User = require('../models/User');
const session = require('../_session');
const express = require('express');
const router = express.Router();



router.post('/login', function(req, res){

    //fazer a checagem da senha antes

    const {accessToken, refreshToken} = session.init(req.body.username);

    User.findOne({ username: req.body.username}, (err, user)=>{

        if(err)
            res.send({user: null, message: err});
        if(user)
            res.send({user: user, accessToken: accessToken, refreshToken: refreshToken, message: "Login realizado com sucesso."});
        else
            res.send({user: null, message: "Usuário não encontrado."});

    });

});


router.post('/signup', function(req, res){

    res.send("Ok");

});


//public info
router.get('/user/getinfo/:username', function(req, res){

    User.findOne({ username: req.params.username}, (err, user)=>{

        if(err)
            res.status(500).send({user: null, message: err});
        else if(user)
            res.status(200).send({user: user, message: "Busca de informações de usuário realizada com sucesso."});
        else
            res.status(404).send({user: null, message: "Usuário não encontrado."});

    });

});  


//private route, private info
router.get('/user/getmyinfo', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){

    User.findOne({ username: req.body.username}, (err, user)=>{

        if(err)
            res.status(500).send({auth: true, user: null, message: err});

        if(user)
            res.status(200).send({auth: true, user: user, message: "Busca de próprias informações realizada com sucesso."});
        else
            res.status(404).send({auth: true, user: null, message: "Usuário não encontrado."});
    });
    
});  


//private route
router.post('/user/update/:username', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){

    const filter = { username: req.body.username };

    const update = req.body;

    User.findOneAndUpdate(filter, update).then(doc=>{
        //this param doc is the document before update
        res.send("Profile's saved");

    }).catch(error=>{

        res.send(error);

    });

});   


//private route
router.put('/user/delete/:username', (req, res, next) => session.verifyJWT(req, res, next), deleteUser = function(req, res){

    res.send("Ok");

});    


module.exports = router;

  
