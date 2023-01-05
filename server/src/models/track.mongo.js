//------- Creates Scehma for Mongo DataBase---------//
/* Through schema we can read, write and delete database content 
 * Schema defines the way an object's data is structured instide the database
 */

const mongoose = require('mongoose');

const trackSchemas = new mongoose.Schema({
    key:
    {
        required: true,
        type: Number,
    },
    robotId:
    {
        required: true,
        type: Number,
    },
    round:
    {
        required: true,  
        type: Number,
    },
    roundTime:
    {
        type: Number,
        required: true
    },
    totalTime:
    {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Track', trackSchemas);