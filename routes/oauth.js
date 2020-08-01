const OauthController = require('../contoller/oauth-controller');

function oauth(router) {

  router.get('/google', async function(req, res) {
    await new OauthController().googlelogin(req, res);
  });

  router.get('/facebook',async function(req,res){
    await new OauthController().facebooklogin(req, res);
  })

  router.get('/twitter/request-token',async function(req,res){
    await new OauthController().twitterloginreq(req, res);
  })
  router.get('/twitter/access-token',async function(req,res){
    await new OauthController().twitterloginacc(req, res);
  })

  return router;
}

module.exports = oauth;