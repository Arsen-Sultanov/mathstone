const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const services = require('./services');
const router = require('./routers');
const { serverPort } = require('./config');
const app = express();
app
    .use(express.urlencoded({extended: true}))
    .use(cookieParser())
    .use(express.json())
    .use(cors({credentials: true, origin: ['http://localhost:3333', 'http://ustaz.tilda.ws', 'http://nositel.kz'] }))
    .use('/api/v1', router);

app.listen(serverPort, (error)=>{
    if(error){
        console.error(error.message);
        return;
    }
    console.log('server start on port ' + serverPort);
})