const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

var allowList = {};


router.post('/login', function(req, res){

    //fazer a checagem da senha antes

    const accessToken = jwt.sign({ username: req.body.username }, process.env.SECRET, {
        expiresIn: 10 // expires in 2 minutes
    });

    const refreshToken = jwt.sign({ username: req.body.username }, process.env.SECRET, {
        expiresIn: 604800 // expires in one week
    });

    //adiciona a permissão pra usar refresh token apenas para o access token criado
    allowList[String(refreshToken)] = String(accessToken);

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
            res.send({user: null, message: err});
        else if(user)
            res.send({user: user, message: "Busca de informações de usuário realizada com sucesso."});
        else
            res.send({user: null, message: "Usuário não encontrado."});

    });

});  


//private route, private info
router.get('/user/getmyinfo', verifyJWT, function(req, res){

    User.findOne({ username: req.body.username}, (err, user)=>{

        if(err)
            res.send({auth: true, user: null, message: err});

        if(user)
            res.send({auth: true, user: user, message: "Busca de próprias informações realizada com sucesso."});
        else
            res.send({auth: true, user: null, message: "Usuário não encontrado."});
    });
    
});  


//private route
router.post('/user/update/:username', verifyJWT, function(req, res){

    const filter = { username: req.body.username };

    const update = req.body;

    User.findOneAndUpdate(filter, update).then(doc=>{
        //this param doc is the document before update
        res.send("Profile's saved");

    }).catch(error=>{

        console.error(error);
        res.send(error);

    });

});   


//private route
router.put('/user/delete/:username', verifyJWT, deleteUser = function(req, res){

    res.send("Ok");

});    



function verifyJWT(req, res, next){
    
    console.log(allowList);
    const accessToken = req.headers['x-access-token'];
    const refreshToken = req.headers['x-refresh-token'];

    if (!accessToken) 
        return res.send({auth: false, user: null, message: 'No access token provided.'});
    
    jwt.verify(accessToken, process.env.SECRET, function(err, decoded) {

        if (err){
            
            if(allowList[String(refreshToken)]==="invalidated"){

                return res.send({auth: false, message: 'Token has been invalidated'});

            } else {    

                //tentar atualizar o token de acesso pelo refreshToken
                jwt.verify(refreshToken, process.env.SECRET, function(err, decoded) {

                    if (err){

                        return res.send({auth: false, refresh: false, message: 'Invalid refresh token or it has expired, try logging in again.'});

                    } else if (allowList[String(refreshToken)]===String(accessToken)) {

                        //gerar novo token
                        const newAccessToken = jwt.sign({ username: decoded.username }, process.env.SECRET, {
                            expiresIn: 10 // expires in 2 minutes
                        });

                        //atualiza a permissão pra usar refresh token apenas para quem tem o access token correto
                        allowList[String(refreshToken)] = String(newAccessToken);
                        return res.send({auth: false, refresh:true,  newAccessToken:newAccessToken, message: 'Session has expired. New Access Token provided.'});

                    } else {

                        //nao esta na lista de permitidos, alguem tentou roubar a sessão
                        allowList[String(refreshToken)] = "invalidated"; //invalidando refreshToken
                        return res.send({auth: false, refresh: false, message: 'Session hijacking, try logging in again'});

                    }

                });

            }   
            

        } else {

            req.body.username = decoded.username;
            next();

        }

    });

}


module.exports = router;

  
