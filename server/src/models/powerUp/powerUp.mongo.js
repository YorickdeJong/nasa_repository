//------- Creates Scehma for Mongo DataBase---------//
/* Through schema we can read, write and delete database content 
 * Schema defines the way an object's data is structured instide the database
 */

const mongoose = require('mongoose');

const powerUpSchemas = new mongoose.Schema({
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
    powerUp:
    {
        required: true,
        type: Number,
    },
    totalTime:
    {
        required: true,
        type: Number,
    }
});

module.exports = mongoose.model('powerUps', powerUpSchemas);