const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('./selfsigned.key', 'utf8');
const certificate = fs.readFileSync('./public-selfsigned.crt', 'utf8');


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

const credentials = {key: privateKey, cert: certificate};
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(serverPort, (error)=>{
    if(error){
        console.error(error.message);
        return;
    }
    console.log('server start on port ' + serverPort);
})