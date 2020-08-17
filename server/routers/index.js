const { Router } = require('express');
const { room } = require('../controlers')
const publicRouter = Router();



publicRouter.get('/ping', (req, res)=>{
    res.status(200).send('pong');
});

publicRouter.get('/room/new', room.newRoom);
publicRouter.post('/room/connect', room.connect);  
module.exports = publicRouter;