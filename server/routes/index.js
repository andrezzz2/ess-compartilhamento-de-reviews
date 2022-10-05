module.exports = database => {

    const router = require('express').Router();
    const session = require('../_session');
    const UserSchema = require('../models/User');
    const User = database.conn.model('User', UserSchema);

    router.post('/login', function(req, res){

        User.findOne({ username: req.body.username, password: req.body.password}, (err, user)=>{
            
            if(err){
                console.log(err);
                res.send({user: null, message: "Erro ao buscar usuário, tente novamente mais tarde."});
            }
            if(user){
                const {accessToken, refreshToken} = session.init(req.body.username);
                res.send({user: user, accessToken: accessToken, refreshToken: refreshToken, message: "Login realizado com sucesso."});
            }
            else
                res.send({user: null, message: "Usuário ou senha incorretos."});
    
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

    
    //private route
    router.post('/user/addfollower/:username',(req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        const filter = { username: req.body.username };
        const filter2 = {username: req.params.username};
        const updateFollowing = req.body.followingList;
        const updateFollower = req.body.followersList;

        updateFollowing.push(req.params.username);
        updateFollower.push(req.body.username);

        User.findOneAndUpdate(filter, {$set: { followingList: updateFollowing}}).then(doc=>{
            //this param doc is the document before update
            User.findOneAndUpdate(filter2, {$set: {followersList: updateFollower}}).then(doc=>{
                //this param doc is the document before update
    
                res.send({message: "seguidor adicionado :)"});
        
            }).catch(error=>{
        
                res.send(error);
        
            });
    
        }).catch(error=>{
    
            res.send(error);
    
        });

        

    });


    //private route
    router.post('/user/removefollower/:username',(req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        const filter = { username: req.body.username};
        const filter2 = {username: req.params.username};
        const updateFollower = req.body.followersList;
        const updateFollowing = req.body.followingList;

        if(updateFollowing.includes(req.params.username)){
            updateFollowing.splice(updateFollowing.indexOf(req.params.username),1);
            updateFollower.splice(updateFollower.indexOf(req.body.username),1);

            User.findOneAndUpdate(filter, {$set: { followingList: updateFollowing}}).then(doc=>{
                //this param doc is the document before update
                User.findOneAndUpdate(filter2, {$set: {followersList: updateFollower}}).then(doc=>{
                    //this param doc is the document before update
        
                    res.send({message: "seguidor removido!"});
            
                }).catch(error=>{
            
                    res.send(error);
            
                });
        
            }).catch(error=>{
        
                res.send(error);
        
            });
        }

        else{
            console.log("Usuário não consta na lista de seguindo!")
        }
        

    });


    return router;

}