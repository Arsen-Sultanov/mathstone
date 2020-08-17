const { Schema, Types, connection } = require('mongoose');
const room = new Schema({
    ownerId: { 
        type: Schema.ObjectId, 
        default: Types.ObjectId()
    },
    roomId: {
        type: String, 
        default: ()=> (Date.now() + Math.floor(Math.random() * 250000000)) % 1000000000
    },
    isStarted: {
        type: Boolean,
        default: false
    },
    party: [
        {
            memberId: {
                type: Schema.ObjectId, 
                default: Types.ObjectId()
            },
            name:{
                type: String,
                require: true
            },
            hp: {
                type: Number,
                default: 100
            },
            mp: {
                type: Number,
                default: 0
            },

        }
    ],
    log: [String]
});


module.exports = connection.model('room', room);
