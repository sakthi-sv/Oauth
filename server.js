const express=require('express');

const app=express();
const router=express.Router();
require('./routes/oauth')(router);

app.use(express.json());
const passportConfig=require('./passport')
app.use('/ecom/oauth',router);


const port=4000
app.listen(port,()=>console.log('listining',port));