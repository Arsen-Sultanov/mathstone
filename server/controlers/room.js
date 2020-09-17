const Room = require('../models');

module.exports = {
    async newRoom(req, res) {
        try {
            let room;

            if (req.body.ownerId) {
                room = await Room.findOne({ownerId: req.body.ownerId});
                res.status(200).send(room);
                return;  
            }
            room = new Room();
            await room.save();
            
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
            if (req.body.memberId && req.body.memberIndex) {
                const user = room.party[+req.body.memberIndex];
                if (user) {
                    res.status(200).send(room);
                    return;
                }  
            }
            room.party.push({ name });
            await room.save();
            room._doc.memberIndex = room.party.length - 1;
            console.log(room);
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
            const { roomId, ownerId } = req.body;
            const room = await Room.findOne( {roomId} );
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
    },

    async getRoom(req, res) {
        try{
            console.log(req.body);
            const { roomId, ownerId } = req.body;
            const room = await Room.findOne({ roomId });
            console.log(roomId, ownerId);
            console.log(room);
            if ( !room ) {
                res.status(404).send({
                    status: 404,
                    message: 'Такой комнаты нет!'
                });
                return;
            }
            if ( !(room._doc.ownerId.toString() === ownerId)) {
                res.status(401).send({
                    status: 401,
                    message: 'Вы не являетесь создателем данной комнаты'
                })
                return;
            }
            res.status(200).send(room);
        } catch(error){
            console.log(error.message);
            res.status(500).send({
                status: 500,
                error: error.message
            });
        }
    }


    
}