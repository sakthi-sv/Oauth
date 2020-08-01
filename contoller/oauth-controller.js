const GoogleOauthService = require('../service/google-oauth-service');
const FbOauthService=require('../service/fb-oauth-service');
const TwitterOauthService=require('../service/twitter-oauth-service');

function oauthController() { }

oauthController.prototype.googlelogin = async function (req, res) {
    
    try {
         await new GoogleOauthService().googlelogin(req);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};

oauthController.prototype.facebooklogin = async function (req, res) {
    
    try {
         await new FbOauthService().fblogin(req);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};

oauthController.prototype.twitterloginreq = async function (req, res) {
    
    try {
         await new TwitterOauthService().getRequest(req,res);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};
oauthController.prototype.twitterloginacc = async function (req, res) {
    
    try {
         await new TwitterOauthService().getAccess(req,res);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};

module.exports = oauthController;