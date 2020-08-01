const passport=require('passport')
const axios =require('axios');
// https://console.developers.google.com/
function googleoauthService() { }

googleoauthService.prototype.googlelogin=async function(req){
    console.log('hi',req.query.code);
    const code=req.query.code;
    const access_token=await this.getAccessTokenFromCode(code)
    const data=await this.getProfile(access_token)
    
}
googleoauthService.prototype.getAccessTokenFromCode=async function(code) {
    try{

        const { data } = await axios.post(
            `https://oauth2.googleapis.com/token`,
            {
                client_id: 'CLIENT ID',
                client_secret: 'CLIENT SECRET',
                redirect_uri: 'http://localhost:4000/ecom/oauth/google',
                grant_type: 'authorization_code',
                code,
            }
          
            )
            console.log(data);
            // { access_token, expires_in, token_type, refresh_token }
         return data.access_token;
        }
        catch(error){console.log('cjg',error)}
  };

  googleoauthService.prototype.getProfile=async function(accesstoken) {
    const { data } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    console.log(data); // { id, email, given_name, family_name }
    return data;
  };

module.exports=googleoauthService