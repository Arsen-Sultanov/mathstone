const mongoose = require('mongoose');
const { mongo } = require('../config');
mongoose.Promise = require('bluebird');

(async ()=>{
    try {
        await mongoose.connect(mongo.url, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('mongo connected')
    } catch (error) {
        console.error(error.message);
    }
    
})();
