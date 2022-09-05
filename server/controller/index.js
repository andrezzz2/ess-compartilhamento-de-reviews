const User = require('../models/User');
const jwt = require('jsonwebtoken');
    


module.exports.login = function(req, res){

    //antes do login checar se header não possui token

    const sessionToken = jwt.sign({ username: req.body.username }, process.env.SECRET, {
        expiresIn: 604800 // expires in one week
    });

    const token = String(sessionToken);

    if(!inSession[token])
        userSession(token);

    User.findOne({ username: req.body.username}, (err, user)=>{

        if(err)
            res.send({sessionToken: null, user: null, message: err});

        if(user)
            res.send({sessionToken: token, user: user, message: "Busca realizada com sucesso."});
        else
            res.send({sessionToken: token, user: null, message: "Usuário não encontrado."});

    });

}

module.exports.signUp = function(req, res){
    res.send("Ok");
}

module.exports.getMyInfo = function(req, res){

    const token = String(req.headers["session-token"]);
    if(inSession[token]){
        User.findOne({ username: req.body.username}, (err, user)=>{

            if(err)
                res.send({auth: true, user: null, message: err});

            if(user)
                res.send({auth: true, user: user, message: "Busca realizada com sucesso."});
            else
                res.send({auth: true, user: null, message: "Usuário não encontrado."});
    
        });
    } else {
        //não está logado, não pode acessar essa rota
        res.send({auth: false, user: null, message: "Sessão esgotada."});
    }
    
}

//public info
module.exports.getInfo = function(req, res){

    User.findOne({ username: req.params.username}, (err, user)=>{

        if(err)
            res.send({user: null, message: err});
        else if(user)
            res.send({user: user, message: "Busca realizada com sucesso."});
        else
            res.send({user: null, message: "Usuário não encontrado."});

    });
}

module.exports.updateUser = function(req, res){

    const filter = { username: req.body.username };

    const update = req.body;

    User.findOneAndUpdate(filter, update).then(doc=>{
        //this param doc is the document before update
        res.send("Profile's saved");

    }).catch(error=>{

        console.error(error);
        res.send(error);

    });

}

module.exports.deleteUser = function(req, res){
    res.send("Ok");
}


module.exports.refreshSession = function(req, res){

    const token = String(req.headers['session-token']);
    console.log("token recebido no refreshSession", token);
    if(inSession[token]){

        refreshSession(token);
        res.send({auth: true, message: "Sessão renovada."});

    } else {

        res.send({auth: false, message: "Sessão não existe."});

    }

}





var recentActivityOfSession = {};
var inSession = {};

function refreshSession(token) {
    recentActivityOfSession[token] = true;
}

async function userSession(token){

    inSession[token] = true;

    const limite = 48;  //48 contagens de 1 hora, 2 dias sem mexer a sessão encerra
    let contador = 0;

    console.log("session", token , "has started");
    const intervalId = setInterval(function(){
        
        if(contador <= limite){

            if (recentActivityOfSession[token] == true){

                contador = 0;
                recentActivityOfSession[token] = false;
                console.log("session", token ," has been refreshed");
    
            } else contador += 1;
        
        } else {

            inSession[token] = false;
            console.log("session", token , "has expired");
            clearInterval(intervalId);

        }   

    }, 3600000); //a cada 1 hora

}

