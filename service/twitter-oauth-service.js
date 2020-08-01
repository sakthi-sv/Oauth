var Twitter = require("login-with-twitter")
var TwitterLite=require("twitter-lite");
// url:https://developer.twitter.com/ 
function twitteroauthService() {
     twitter = new Twitter({
        consumerKey: 'GET YOUR CONSUMER KEY FROM TWITTER',
    	consumerSecret: 'GET YOUR CONSUMER SECRET FROM TWITTER',
    	callbackUrl: 'http://localhost:4000/ecom/oauth/twitter/access-token'
    });
 }

twitteroauthService.prototype.getRequest=async function(req,res){
    
    twitter.login(function(err,requestSecret,url) {
        if (err)
            res.status(500).send(err);
        else {
            _requestSecret = requestSecret;
            console.log(requestSecret,url);
            res.redirect(url);
        }
    });
}

twitteroauthService.prototype.getAccess=async function(req,res){
        twitter.callback({
            oauth_token: req.query.oauth_token,
            oauth_verifier: req.query.oauth_verifier
          }, _requestSecret, function(err, user) {
            if (err)
                res.status(500).send(err);
            else{
                console.log(user);
                const client=new TwitterLite({
                    subdomain: "api", // "api" is the default (change for other subdomains)
                    version: "1.1", // version "1.1" is the default (change for other subdomains)
                    consumer_key: '', // from Twitter.
                    consumer_secret: '', // from Twitter.
                    access_token_key: user.userToken, // from your User (oauth_token)
                    access_token_secret: user.userTokenSecret, // from your User (oauth_token_secret)
                    include_email:'true'
                })
                client.get("account/verify_credentials")
                    .then(results => {
                        console.log("results", results);
                    })
                    .catch(console.error);
            }
        });
    
}

module.exports=twitteroauthService;