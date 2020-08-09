const express = require('express');
const cors = require('cors');
const services = require('./services');
const router = require('./routers');
const { serverPort } = require('./config');
const Model = require('./models')
const app = express();
app
    .use(express.urlencoded({extended: true}))
    .use(express.json())
    .use(cors({credentials: true, origin: ['http://localhost:3333'] }))
    .use('/api/v1', router);
const test = new Model({});
test.save();
app.listen(serverPort, (error)=>{
    if(error){
        console.error(error.message);
        return;
    }
    console.log('server start on port ' + serverPort);
})