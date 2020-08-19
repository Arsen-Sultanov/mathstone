const { Router } = require('express');
const { room, spells } = require('../controlers')
const publicRouter = Router();



publicRouter.get('/ping', (req, res)=>{
    res.status(200).send('pong');
});

publicRouter.get('/room/new', room.newRoom);
publicRouter.post('/room/connect', room.connect);
publicRouter.post('/room/cast-fireball', spells.spellCastTargetFireball);
publicRouter.post('/room/cast-firewave', spells.spellCastTargetFireWave);
module.exports = publicRouter;