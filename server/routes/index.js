module.exports = databaseController => {

    const router = require('express').Router();
    const session = require('../_session');
    const UserSchema = require('../models/User');
    const User = databaseController.conn.model('User', UserSchema);

    router.post('/login', function(req, res){

        User.findOne({ username: req.body.username, password: req.body.password}, (err, user)=>{
            
            if(err){
                console.log(err);
                res.status(502).send({user: null, message: "Erro ao buscar usuário, tente novamente mais tarde."});
            }
            if(user){
                const {accessToken, refreshToken} = session.init(req.body.username);
                res.status(201).send({user: user, accessToken: accessToken, refreshToken: refreshToken, message: "Login realizado com sucesso."});
            }
            else
                res.status(406).send({user: null, message: "Usuário ou senha incorretos."}); //not acceptable
    
        });
    
    });
    
    
    router.post('/signup', function(req, res){
        
        const newUser = new User(req.body);
        newUser.save().then(Result=>{

            const result = Result.toObject();
            //usuário foi cadastrado
            if(result){
                console.log(result);
                res.status(201).send({message: "Perfil criado com sucesso."});
            } else res.status(500).send({message: "Erro desconhecido"});
    
        }).catch(error=>{
            console.error(error);
            res.status(502).send({message:"Erro ao criar novo perfil de usuário."});
        });
    
    });
    
    
    //public info
    router.get('/user/getinfo/:username', function(req, res){
        
        //vai dar todas as informações menos a senha
        User.findOne({ username: req.params.username}, '-password', (err, user)=>{
    
            if(err)
                res.status(502).send({user: null, message: err});
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
                res.status(502).send({auth: true, user: null, message: err});
    
            if(user)
                res.status(200).send({auth: true, user: user, message: "Busca de próprias informações realizada com sucesso."});
            else
                res.status(404).send({auth: true, user: null, message: "Usuário não encontrado."});
        });
        
    });  
    
    
    //private route
    router.post('/user/updateProfile', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        const filter = { username: req.body.username };
        
        //update deve ser um objeto contendo as informações alteradas
        //const pessoa = {pessoa: req.body.pessoa};
        
       
        User.findOneAndUpdate(filter, {$set: req.body.pessoa}).then(doc=>{
            //adicionar status 
            res.status(200).send({message: "Perfil atualizado com sucesso."});
    
        }).catch(error=>{
            console.log(error);
            res.status(502).send({message: "Erro ao tentar atualizar perfil do usuário."});
    
        });

    
    });   
    
    
    //private route
    router.put('/user/deleteAccount', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        
        User.deleteOne({ username: req.body.username }).then(function(){
            console.log("User",req.body.username,"deleted"); // Success
            res.status(200).send({message: "Conta excluída do sistema."});
        }).catch(function(error){
            console.log(error); // Failure
            res.status(502).send({message: "Erro ao excluir conta."});
        });

    });

    
    //private route
    router.post('/user/addfollower/:username',(req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        const filter = { username: req.body.username };
        const filter2 = {username: req.params.username};
        const updateFollowing = req.body.followingList;
        const updateFollower = req.body.followersList;


        if(updateFollowing.includes(req.params.username)){
            res.status(409).send({message: "usuário já está na lista de seguindo!"});
        }
        else{
            updateFollowing.push(req.params.username);
            updateFollower.push(req.body.username);

            User.findOneAndUpdate(filter, {$set: { followingList: updateFollowing}}).then(doc=>{
                //this param doc is the document before update
                User.findOneAndUpdate(filter2, {$set: {followersList: updateFollower}}).then(doc=>{
                    //this param doc is the document before update
        
                    res.status(201).send({message: "seguidor adicionado :)"});
            
                }).catch(error=>{
            
                    res.send(error);
            
                });
        
            }).catch(error=>{
        
                res.send(error);
        
            });
        }
        

    });


    //private route
    router.post('/user/removefollower/:username',(req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        const filter = {username: req.body.username};
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
        
                    res.status(201).send({message: "seguidor removido!"});
            
                }).catch(error=>{
            
                    res.send(error);
            
                });
        
            }).catch(error=>{
        
                res.send(error);
        
            });
        }

        else{
            res.status(404).send({message:"Usuário não consta na lista de seguindo!"});
        }
        

    });

    //private route
    router.post('/user/add/movie', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        
        User.findOne({ username: req.body.username}, (err, user)=>{
    
            if(err)
                res.status(502).send({user: null, message: err});
            else if(user){
                const moviesList = user.moviesList;

                let notInList = true;
                moviesList.forEach((movie)=>{
                    if(movie.id===req.body.id) notInList = false;
                });

                if(notInList){  
                    moviesList.push(req.body);

                    User.findOneAndUpdate({username: req.body.username}, {$set: {moviesList: moviesList}}).then(doc=>{
                        //this param doc is the document before update
                        res.status(201).send({message: "Livro adicionado a lista!", accepted: true});
                
                    }).catch(error=>{
                
                        res.send(error);
                
                    });
                } else {
                    res.status(202).send({message: "Livro já na lista", accepted: false});
                }
            }
            else
                res.status(404).send({user: null, message: "Usuário não encontrado."});
    
        });

    });

    //private route
    router.post('/user/add/tvSeries', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        
        User.findOne({ username: req.body.username}, (err, user)=>{
    
            if(err)
                res.status(502).send({user: null, message: err});
            else if(user){
                const seriesList = user.seriesList;

                let notInList = true;
                seriesList.forEach((serie)=>{
                    if(serie.id===req.body.id) notInList = false;
                });

                if(notInList){  
                    seriesList.push(req.body);

                    User.findOneAndUpdate({username: req.body.username}, {$set: {seriesList: seriesList}}).then(doc=>{
                        //this param doc is the document before update
                        res.status(201).send({message: "Série adicionada a lista!", accepted: true});
                
                    }).catch(error=>{
                
                        res.send(error);
                
                    });
                } else {
                    res.status(202).send({message: "Série já na lista", accepted: false});
                }
            }
            else
                res.status(404).send({user: null, message: "Usuário não encontrado."});
    
        });

    });

    //private route
    router.post('/user/add/book', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        
        User.findOne({ username: req.body.username}, (err, user)=>{
    
            if(err)
                res.status(502).send({user: null, message: err});
            else if(user){
                const booksList = user.booksList;

                let notInList = true;
                booksList.forEach((book)=>{
                    if(book.id===req.body.id) notInList = false;
                });

                if(notInList){  
                    booksList.push(req.body);

                    User.findOneAndUpdate({username: req.body.username}, {$set: {booksList: booksList}}).then(doc=>{
                        //this param doc is the document before update
                        res.status(201).send({message: "Livro adicionado a lista!", accepted: false});
                
                    }).catch(error=>{
                
                        res.send(error);
                
                    });
                } else {
                    res.status(202).send({message: "Livro já na lista", accepted: false});
                }
            }
            else
                res.status(404).send({user: null, message: "Usuário não encontrado."});
    
        });

    });

    router.post('/user/changePassword', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        const filter = { username: req.body.username };
        //update deve ser um objeto contendo as informações alteradas
        //const pessoa = {pessoa: req.body.pessoa};
        const password = req.body.password;
       
        User.findOneAndUpdate(filter, {$set: {password: password}}).then(doc=>{
            //adicionar status 
            res.status(200).send({message: "Senha alterada!"});
    
        }).catch(error=>{
            console.log(error);
            res.status(502).send({message: "Erro ao tentar alterar a senha do usuário."});
    
        });

    
    });   
    
    return router;

}