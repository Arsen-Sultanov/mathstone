const Room = require('../models');


module.exports = {
    async spellCastTargetFireball(req, res) {
        try {
            const spellCost = 1;
            const spellName = 'Огненная искра'
            const { memberId, memberIndex, roomId } = req.cookies;
            const { targetIndex } = req.body;
            const room = await Room.findOne({ roomId });
            const member = room.party[+memberIndex];
            const target = room.party[+targetIndex];
            if (member.mp < spellCost) {
                res.status(200).send({
                    status: 200,
                    message: 'У вас недостаточно маны для этого заклинания!'
                });
                return;
            }
            const damage = Math.floor(Math.random()*10) + 1;
            target.hp -= damage;
            member.mp -= spellCost;
            room.log.push(`${member.name} нанес ${damage} урона игроку ${target.name} использовав магию ${spellName}`);
            await room.save();
            res.status(200).send({
                status: 200,
                message: `Ваша магия нанесла ${damage} урона!`,
                room: room
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