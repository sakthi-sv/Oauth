const passport=require('passport')
const axios =require('axios');
// https://developers.facebook.com/
function fboauthService() { }

fboauthService.prototype.fblogin=async function(req){
    console.log('hi',req.query.code);
    const code=req.query.code;
    const access_token=await this.getAccessTokenFromCode(code)
    const data=await this.getProfile(access_token)
    return (data)
}

fboauthService.prototype.getAccessTokenFromCode=async function(code) {
    const { data } = await axios({
      url: 'https://graph.facebook.com/v4.0/oauth/access_token',
      method: 'get',
      params: {
        client_id: 'GET YOUR CLIENT ID FROM FB',
        client_secret: 'GET CLIENT SECRET',
        redirect_uri: 'http://localhost:4000/oauth/facebook',
        code,
      },
    });
    console.log(data); // { access_token, token_type, expires_in }
    return data.access_token;
  };

  fboauthService.prototype.getProfile=async function(accesstoken) {
    const { data } = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        fields: ['id', 'email', 'first_name', 'last_name'].join(','),
        access_token: accesstoken,
      },
    });
    console.log(data); // { id, email, first_name, last_name }
    return data;
  };


module.exports=fboauthService