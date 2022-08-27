const User = require('../models/User');
const Review = require('../models/Review');


var recentActivityUsers = {};
var loggedUsers = {};
userSession("andrezzz");


//long polling
async function userSession(username){

    loggedUsers[username] = true;
    const limite = 300;  //30 contagems de 10s que é igual a 5 minutos até o esgotar o tempo
    let contador = 0;
    console.log("user", username , "started a session");
    const intervalId = setInterval(function(){
        
        console.log(username,"has",((limite-contador)),"seconds left");
        if(contador == limite){

            loggedUsers[username] = false;
            console.log("user", username , "session expired");
            clearInterval(intervalId);

        } else if(recentActivityUsers[username] == true){

            contador = 0;
            recentActivityUsers[username] = false;
            console.log("user", username ," session refreshed");

        } else {

            contador += 1;

        }

    }, 1000); //a cada 10s uma checagem

}

function refreshUserSession(username) {
    recentActivityUsers[username] = true;
}

function isLoggedIn(username) {
    if(loggedUsers[username]) return true;
    else return false;
}
    







module.exports.login = function(req, res){
    userSession(req.body.username);
    res.send("Ok");
}

module.exports.signUp = function(req, res){
    res.send("Ok");
}

module.exports.getFollowers = function(req, res){
    res.send("Ok");
}

module.exports.getFollowing = function(req, res){
    res.send("Ok");
}

module.exports.getMyInfo = function(req, res){

    if(isLoggedIn(req.body.username)){
        User.findOne({ username: req.body.username}, (err, user)=>{

            if(err)
                res.send(null);
            if(user)
                res.send(user);
            else
                //usuário não encontrado
                res.send(null);
    
        });
    } else {
        //não está logado, não pode acessar essa rota
        res.send(null);
    }
    
}

module.exports.getInfo = function(req, res){

    User.findOne({ username: req.params.username}, (err, user)=>{

        if(err)
            res.send(null);
        else if(user)
            res.send(user);
        else
            //usuário não encontrado
            res.send(null);

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

module.exports.history = function(req, res){
    res.send("Ok");
}

module.exports.alive = function(req, res){

    if(loggedUsers[req.body.username]){
        
        console.log(req.body.username,"is telling it is alive");
        refreshUserSession(req.body.username);
        res.send(true);

    } else {

        res.send(false);

    }

}