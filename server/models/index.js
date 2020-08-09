const { Schema, connection } = require('mongoose');
const room = new Schema({
    ownerId: { type: Schema.ObjectId, require: true },
    roomId: {
        type: String, 
        default: ()=> (Date.now() + Math.floor(Math.random() * 250000000)) % 100000000
    }
});


module.exports = connection.model('room', room);
