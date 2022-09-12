const jwt = require('jsonwebtoken');
require('dotenv/config');

class SessionController {

    constructor () {

        this.allowList = {};

    }

    init(username) {

        const accessToken = this.createAccessToken(username);
        const refreshToken = this.createRefreshToken(username);
        this.assignToRefreshToken(refreshToken, accessToken);

        return {accessToken: accessToken, refreshToken: refreshToken};

    }

    createAccessToken(username) {

        const accessToken = jwt.sign({ username: username }, process.env.SECRET, {
            expiresIn: 120 // expires in 2 minutes
        });

        return accessToken;

    }

    createRefreshToken(username) {

        const refreshToken = jwt.sign({ username: username }, process.env.SECRET, {
            expiresIn: 604800 // expires in one week
        });
        
        return refreshToken;

    }

    assignToRefreshToken(refreshToken, accessToken) {

        this.allowList[String(refreshToken)] = String(accessToken);

    }

    invalidateRefreshToken(refreshToken) {

        delete this.allowList[String(refreshToken)];

    }

    isValidRefreshToken(refreshToken) {

        if(String(refreshToken) in this.allowList) return true;

        else return false;
    
    }

    isAccessTokenBelongsToRefreshToken(refreshToken, accessToken) {

        if(this.allowList[String(refreshToken)]===String(accessToken)) return true;
        else return false;

    }

    verifyJWT(req, res, next){
    
        const accessToken = req.headers['x-access-token'];
        const refreshToken = req.headers['x-refresh-token'];
    
        if (!accessToken || !refreshToken) 
            return res.send({auth: false, user: null, message: 'No tokens provided.'});

        try {

            var decoded = jwt.verify(accessToken, process.env.SECRET);
            req.body.username = decoded.username;
            next();

        } catch(err) {
            // access token expirou
            if(this.isValidRefreshToken(refreshToken)){     //verificar se o server tem registrado o refresh token
                
                try {   

                    var decoded = jwt.verify(refreshToken, process.env.SECRET);
                    
                    if (this.isAccessTokenBelongsToRefreshToken(refreshToken, accessToken)) {

                        //cria novo access token e atribui ele ao refresh token
                        const newAccessToken = this.createAccessToken(decoded.username);
                        this.assignToRefreshToken(refreshToken, newAccessToken);
                        return res.send({auth: false, refresh:true,  newAccessToken:newAccessToken, message: 'Session has expired. New Access Token provided.'});

                    } else {

                        //nao esta na lista de permitidos, alguem tentou roubar a sessão
                        this.invalidateRefreshToken(refreshToken);
                        return res.send({auth: false, refresh: false, message: 'Session hijacking, try logging in again'});

                    }

                } catch(err) {

                    //refresh token também expirou, então só resta logar de novo
                    return res.send({auth: false, refresh: false, message: 'Invalid refresh token or it has expired, try logging in again.'});

                }
                
            } else {

                return res.send({auth: false, message: 'Token has been invalidated or server lost it.'});

            }

        }
        
    }


}

module.exports = new SessionController();