const Room = require('../models');

module.exports = {
    
    async addMp(req, res) {
        try {
            const { ownerId, roomId, memberIndex } = req.body;
            const room = await Room.findOne({ roomId });
            if (room.ownerId === ownerId) {
                room.party[memberIndex].mp += 1;
                await room.save();
                res.status(200).send({
                    status: 200,
                    message: `${room.party[memberIndex].name} добавлена мана! Молодец!`
                });
                return;
            }
            res.status(401).send({
                status: 401,
                message: 'Вы не являетесь владельцем комнаты!'
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send({
                status: 500,
                error: error.message
            });
        }

    },

    async surrended() {

    },

    async getMe(req, res) {
        try {
            const { roomId, memberId, memberIndex } = req.body;
            const room = await Room.findOne({ roomId });
            const member = room.party[memberIndex];
            if (memberId === member.memberId) {
                res.status(200).send(room);
                return;
            }
            res.status(401).send({
                status: 401,
                message: 'Вы не являетесь участником комнаты!'
            });
        } catch(error) {
            console.log(error.message);
            res.status(500).send({
                status: 500,
                error: error.message
            });
        }
    }

}