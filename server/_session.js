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
        req.body.responseObject = {};
        
        if (!accessToken || !refreshToken){
            req.body.responseObject.auth = false;
            req.body.responseObject.authMessage = 'No tokens provided.';
            return res.send({responseObject: req.body.responseObject});
        }
            
        try {

            var decoded = jwt.verify(accessToken, process.env.SECRET);
            req.body.username = decoded.username;

            req.body.responseObject.auth = true;
            req.body.responseObject.authMessage = 'Succesfull authentication with Access Token.';
            next();

        } catch(err) {
            // access token expirou
            if(err.name === 'TokenExpiredError') {
                const decoded = jwt.verify(accessToken, process.env.SECRET, {ignoreExpiration: true});
                req.body.username = decoded.username;
            } else {
                req.body.responseObject.auth = false;
                req.body.responseObject.authMessage = 'Invalid access token, try logging in again.';
                return res.send({responseObject: req.body.responseObject});
            }

            if(this.isValidRefreshToken(refreshToken)){     //verificar se o server tem registrado o refresh token
                
                try {   

                    var decoded = jwt.verify(refreshToken, process.env.SECRET);
                    
                    if (this.isAccessTokenBelongsToRefreshToken(refreshToken, accessToken)) {

                        //cria novo access token e atribui ele ao refresh token
                        const newAccessToken = this.createAccessToken(decoded.username);
                        this.assignToRefreshToken(refreshToken, newAccessToken);

                        req.body.responseObject.auth = true;
                        req.body.responseObject.authMessage = 'Session has expired. New Access Token provided.';
                        req.body.responseObject.newAccessToken = newAccessToken;
                        next();

                    } else {

                        //nao esta na lista de permitidos, alguem tentou roubar a sessão
                        this.invalidateRefreshToken(refreshToken);
                        req.body.responseObject.auth = false;
                        req.body.responseObject.authMessage = 'Session hijacking, try logging in again';
                        return res.send({responseObject: req.body.responseObject});

                    }

                } catch(err) {

                    //refresh token também expirou, então só resta logar de novo
                    if(err.name === 'TokenExpiredError') {
                        req.body.responseObject.auth = false;
                        req.body.responseObject.authMessage = 'Refresh token has expired, try logging in again.';
                        return res.send({responseObject: req.body.responseObject});
                    } else {
                        req.body.responseObject.auth = false;
                        req.body.responseObject.authMessage = 'Invalid refresh token, try logging in again.';
                        return res.send({responseObject: req.body.responseObject});
                    }

                }
                
            } else {
                
                req.body.responseObject.auth = false;
                req.body.responseObject.authMessage = 'Token has been invalidated or server lost it.'
                return res.send({responseObject: req.body.responseObject});

            }

        }
        
    }


}

module.exports = new SessionController();