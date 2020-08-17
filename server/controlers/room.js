const Room = require('../models');

module.exports = {
    async newRoom(req, res) {
        try {
            let room;
            console.log(req.cookies);
            if (req.cookies.ownerId) {
                room = await Room.findOne({ownerId: req.cookies.ownerId});
                res.status(200).send(room);
                return;  
            }
            room = new Room();
            await room.save();
            res.cookie('ownerId', room.ownerId, { expires: new Date(Date.now() + 1000*60*60*24*365), httpOnly: true });
            res.cookie('roomId', room.roomId, { expires: new Date(Date.now() + 1000*60*60*24*365), httpOnly: true });
            res.status(200).send(room);
        } catch(error) {
            console.log(error.message);
            res.status(500).send({
                status: 500,
                error: error.message
            });
        }
    },

    async connect(req, res) {
        try {
            const { name, roomId } = req.body;
            const room = await Room.findOne({ roomId });
            if (!room) {
                res.status(404).send({
                    status: 404,
                    message: 'Комната с таким Id не найдена!'
                });
                return;
            }
            if (req.cookies.memberId && req.cookies.memberIndex) {
                const user = room.party[+req.cookies.memberIndex];
                if (user) {
                    res.status(200).send(room);
                    return;
                }  
            }
            room.party.push({ name });
            await room.save();
            res.cookie(
                'memberId', 
                room.party[room.party.length - 1].memberId, 
                { expires: new Date(Date.now() + 1000*60*60*24), httpOnly: true }
            );
            res.cookie(
                'roomId', 
                room.roomId, 
                { expires: new Date(Date.now() + 1000*60*60*24), httpOnly: true }
            );
            res.cookie(
                'memberIndex', 
                room.party.length - 1, 
                { expires: new Date(Date.now() + 1000*60*60*24), httpOnly: true }
            );
            res.status(200).send(room);
        } catch(error) {
            console.log(error.message);
            res.status(500).send({
                status: 500,
                error: error.message
            });
        }
    },

    async start(req, res) {
        try{
            const { roomId, ownerId } = req.cookies;
            const room = Room.findOne( {roomId} );
            if ( room.ownerId === ownerId ) {
                room.isStarted = true;
                await room.save();
                res.status(200).send({
                    status: 200,
                    message: 'Набор в комнату прекращен!'
                });
                return;
            }
            res.status(401).send({
                status: 401,
                message: 'Вы не являетесь владельцем комнаты!'
            });
        } catch(error){
            console.log(error.message);
            res.status(500).send({
                status: 500,
                error: error.message
            });
        }
    }
}