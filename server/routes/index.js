module.exports = databaseController => {

    const router = require('express').Router();
    const session = require('../_session');
    const UserSchema = require('../models/User');
    const User = databaseController.conn.model('User', UserSchema);


    //public route
    router.post('/login', function(req, res){

        User.findOne({ username: req.body.username, password: req.body.password}, (err, user)=>{
            
            if(err){   //erro do banco

                console.log(err);
                let responseObject = {
                    user: null,
                    message: "Erro ao buscar usuário, tente novamente mais tarde."
                }
                res.status(502).send({responseObject: responseObject});
            }
            if(user){   //login certo
                const {accessToken, refreshToken} = session.init(req.body.username);
                let responseObject = {
                    user: user,
                    message: "Login realizado com sucesso.",
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
                res.status(201).send({responseObject: responseObject});
            }
            else{   //login errado
                let responseObject = {
                    user: null,
                    message: "Usuário ou senha incorretos."
                }
                res.status(406).send({responseObject: responseObject});
            }
        });
    });
    
    //public route
    router.post('/signup', function(req, res){
        
        req.body.photoURL = "https://img.icons8.com/material/344/user--v1.png";
        req.body.bio = "";
        
        const newUser = new User(req.body);

        newUser.save().then(Result=>{

            const result = Result.toObject();
            
            if(result){ //usuário foi cadastrado

                let responseObject = {
                    message: "Perfil criado com sucesso.",
                    accepted: true
                }
                res.status(201).send({responseObject: responseObject});

            } else { //usuário não foi cadastrado

                let responseObject = {
                    message: "Não foi possível realizar o cadastro, tente mais tarde.",
                    accepted:false
                }
                res.status(500).send({responseObject: responseObject});

            }
    
        }).catch(error=>{  //erro ao salvar no BD

            let responseObject = {
                message: "Username ou Email já cadastrado.",
                accepted:false
            }
            res.status(502).send({responseObject: responseObject});
            
        });
    
    });
    
    
    //public route
    router.get('/user/getinfo/:username', function(req, res){
        
        //vai dar todas as informações menos a senha
        User.findOne({ username: req.params.username}, '-password', (err, user)=>{
    
            if(err){  //erro na busca do BD
                let responseObject = {
                    user: null,
                    message: err
                }
                res.status(502).send({responseObject: responseObject});
            }
            else if(user){  //achou usuário
                let responseObject = {
                    user: user,
                    message: "Busca de informações de usuário realizada com sucesso."
                }
                res.status(200).send({responseObject: responseObject});
            }   
            else{   //não achou usuário
                let responseObject = {  
                    user: null,
                    message: "Usuário não encontrado."
                }
                res.status(404).send({responseObject: responseObject});
            }
                
    
        });
    
    });  
    
    
    //private route
    router.get('/user/getmyinfo', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
    
        User.findOne({ username: req.body.username}, (err, user)=>{
    
            if(err){   //erro ao buscar no BD
                req.body.responseObject.user = null;
                req.body.responseObject.message = err;
                res.status(502).send({responseObject: req.body.responseObject});
            }
            if(user){   //achou as informaçoes do usuário
                req.body.responseObject.user = user;
                req.body.responseObject.message = "Busca de próprias informações realizada com sucesso.";
                res.status(200).send({responseObject: req.body.responseObject});
            }
            else{   //não achou as informaçoes do usuário
                req.body.responseObject.user = null;
                req.body.responseObject.message = "Usuário não encontrado.";
                res.status(404).send({responseObject: req.body.responseObject});
            }
                
        });
        
    });  
    
    
    //private route
    router.post('/user/updateProfile', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        const filter = { username: req.body.username };
       
        User.findOneAndUpdate(filter, {$set: req.body.pessoa}).then(doc=>{  //achou e atualizou o usuario

            req.body.responseObject.message = "Perfil atualizado com sucesso.";
            res.status(200).send({responseObject: req.body.responseObject});
    
        }).catch(error=>{  //erro na busca ou atualizaçao

            console.log(error);
            req.body.responseObject.message = "Erro ao tentar atualizar perfil do usuário.";
            res.status(502).send({responseObject: req.body.responseObject});
    
        });
    });   
    
    
    //private route
    router.post('/user/deleteAccount', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        User.deleteOne({ username: req.body.username }).then(function(){  //deletou com sucesso

            req.body.responseObject.message = "Conta excluída do sistema.";
            req.body.responseObject.accepted = true;
            res.status(200).send({responseObject: req.body.responseObject});
            

        }).catch(function(error){

            console.log(error); // falha ao excluir conta
            req.body.responseObject.message = "Erro ao excluir conta."
            res.status(502).send({responseObject: req.body.responseObject});

        });

    });

    
    //private route
    router.post('/user/addfollower/:username',(req, res, next) => session.verifyJWT(req, res, next), function(req, res){

        const filter = { username: req.body.username };
        const filter2 = {username: req.params.username};
        const updateFollowing = req.body.followingList;
        const updateFollower = req.body.followersList;

        if(updateFollowing.includes(req.params.username)){  

            req.body.responseObject.message = "usuário já está na lista de seguindo!";
            res.status(409).send({responseObject: req.body.responseObject});

        }
        else{

            updateFollowing.push(req.params.username);
            updateFollower.push(req.body.username);

            User.findOneAndUpdate(filter, {$set: { followingList: updateFollowing}}).then(doc=>{ //acrescentando usuario na sua lista de seguindo
                
                User.findOneAndUpdate(filter2, {$set: {followersList: updateFollower}}).then(doc=>{ //acrescentando seu usuario na lista de seguidores da pessoa que foi solicitada
                
                    req.body.responseObject.message = "seguidor adicionado :)";
                    res.status(201).send({responseObject: req.body.responseObject});
            
                }).catch(error=>{  //erro na busca ou atualização

                    console.error(error);
                    req.body.responseObject.message = error;
                    res.status(502).send({responseObject: req.body.responseObject});
            
                });
        
            }).catch(error=>{  //erro na busca ou atualização 
                
                console.error(error);
                req.body.responseObject.message = error;
                res.status(502).send({responseObject: req.body.responseObject});
        
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

            User.findOneAndUpdate(filter, {$set: { followingList: updateFollowing}}).then(doc=>{  //retirando usuario da sua lista de seguindo
                
                User.findOneAndUpdate(filter2, {$set: {followersList: updateFollower}}).then(doc=>{  //retirando voce da lista de seguidores do usuario solicitado
                    
                    req.body.responseObject.message = "seguidor removido!";
                    res.status(201).send({responseObject: req.body.responseObject});
            
                }).catch(error=>{  //erro ao buscar ou atualizar

                    console.error(error);
                    req.body.responseObject.message = error;
                    res.status(502).send({responseObject: req.body.responseObject});
            
                });
        
            }).catch(error=>{  //erro ao buscar ou atualizar
        
                console.error(error);
                req.body.responseObject.message = error;
                res.status(502).send({responseObject: req.body.responseObject});
        
            });
        }
        else{  

            req.body.responseObject.message = "Usuário não consta na lista de seguindo!";
            res.status(404).send({responseObject: req.body.responseObject});

        }

    });

    //private route
    router.post('/user/add/movie', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
 
        User.findOne({ username: req.body.username}, (err, user)=>{
    
            if(err){
                
                console.error(err);
                req.body.responseObject.accepted = false;
                req.body.responseObject.message = "Erro ao buscar usuário no BD.";
                res.status(502).send({responseObject: req.body.responseObject});

            } else if (user){  //achou usuário

                //checando se filme já não está na lista
                const moviesList = user.moviesList;
                let notInList = true;
                moviesList.forEach((movie)=>{
                    if(movie.id===req.body.id) notInList = false;
                });

                if(notInList){  

                    moviesList.push(req.body);

                    User.findOneAndUpdate({username: req.body.username}, {$set: {moviesList: moviesList}}).then(doc=>{  //atualizando usuário

                        req.body.responseObject.accepted = true;
                        req.body.responseObject.message = "Filme adicionado a lista!";
                        res.status(201).send({responseObject: req.body.responseObject});
                
                    }).catch(error=>{  //erro ao tentar atualizar usuário
                        
                        console.error(error);
                        req.body.responseObject.accepted = false;
                        req.body.responseObject.message = "Erro ao buscar ou atualizar lista do usuário.";
                        res.status(502).send({responseObject: req.body.responseObject});
                
                    });

                } else {  //já está na lista

                    req.body.responseObject.accepted = false;
                    req.body.responseObject.message = "Filme já está na lista.";
                    res.status(202).send({responseObject: req.body.responseObject});

                }
            } else { //não encontrou usuário no BD

                req.body.responseObject.accepted = false;
                req.body.responseObject.message = "Usuário não encontrado.";
                res.status(404).send({responseObject: req.body.responseObject});

            }

        });

    });

    //private route
    router.post('/user/add/tvSeries', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        
        User.findOne({ username: req.body.username}, (err, user)=>{
    
            if(err){
                
                console.error(err);
                req.body.responseObject.accepted = false;
                req.body.responseObject.message = "Erro ao buscar usuário no BD.";
                res.status(502).send({responseObject: req.body.responseObject});

            } else if (user){  //achou usuário

                //checando se filme já não está na lista
                const seriesList = user.seriesList;
                let notInList = true;
                seriesList.forEach((serie)=>{
                    if(serie.id===req.body.id) notInList = false;
                });

                if(notInList){  

                    seriesList.push(req.body);

                    User.findOneAndUpdate({username: req.body.username}, {$set: {seriesList: seriesList}}).then(doc=>{  //atualizando usuário

                        req.body.responseObject.accepted = true;
                        req.body.responseObject.message = "Série adicionada a lista!";
                        res.status(201).send({responseObject: req.body.responseObject});
                
                    }).catch(error=>{  //erro ao tentar atualizar usuário
                        
                        console.error(error);
                        req.body.responseObject.accepted = false;
                        req.body.responseObject.message = "Erro ao buscar ou atualizar lista do usuário.";
                        res.status(502).send({responseObject: req.body.responseObject});
                
                    });

                } else {  //já está na lista

                    req.body.responseObject.accepted = false;
                    req.body.responseObject.message = "Série já está na lista.";
                    res.status(202).send({responseObject: req.body.responseObject});

                }
            } else { //não encontrou usuário no BD

                req.body.responseObject.accepted = false;
                req.body.responseObject.message = "Usuário não encontrado.";
                res.status(404).send({responseObject: req.body.responseObject});

            }

        });

    });

    //private route
    router.post('/user/add/book', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        
        User.findOne({ username: req.body.username}, (err, user)=>{
    
            if(err){
                
                console.error(err);
                req.body.responseObject.accepted = false;
                req.body.responseObject.message = "Erro ao buscar usuário no BD.";
                res.status(502).send({responseObject: req.body.responseObject});

            } else if (user){  //achou usuário

                //checando se filme já não está na lista
                const booksList = user.booksList;
                let notInList = true;
                booksList.forEach((book)=>{
                    if(book.id===req.body.id) notInList = false;
                });

                if(notInList){  

                    booksList.push(req.body);

                    User.findOneAndUpdate({username: req.body.username}, {$set: {booksList: booksList}}).then(doc=>{  //atualizando usuário

                        req.body.responseObject.accepted = true;
                        req.body.responseObject.message = "Livro adicionado a lista!";
                        res.status(201).send({responseObject: req.body.responseObject});
                
                    }).catch(error=>{  //erro ao tentar atualizar usuário
                        
                        console.error(error);
                        req.body.responseObject.accepted = false;
                        req.body.responseObject.message = "Erro ao buscar ou atualizar lista do usuário.";
                        res.status(502).send({responseObject: req.body.responseObject});
                
                    });

                } else {  //já está na lista

                    req.body.responseObject.accepted = false;
                    req.body.responseObject.message = "Livro já está na lista.";
                    res.status(404).send({responseObject: req.body.responseObject});
                }
            }
        });

    });

    router.post('/user/changePassword', (req, res, next) => session.verifyJWT(req, res, next), function(req, res){
        
        const filter = { username: req.body.username };
        const password = req.body.password;
       
        User.findOneAndUpdate(filter, {$set: {password: password}}).then(doc=>{
             
            req.body.responseObject.message = "Senha alterada!";
            res.status(200).send({responseObject: req.body.responseObject});
    
        }).catch(error=>{

            console.log(error);
            req.body.responseObject.message = "Erro ao tentar alterar a senha do usuário.";
            res.status(502).send({responseObject: req.body.responseObject});
    
        });

    
    });   
    
    return router;

}