const { Router } = require('express');
const publicRouter = Router();



publicRouter.get('/ping', (req, res)=>{
    res.status(200).send('pong');
});

module.exports = publicRouter;