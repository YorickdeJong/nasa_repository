/* Router defines how an application's endpoint respond to a clients request
 * express object corresponds to http methods -> ex: app.get for get requests
 * express is used as middleware
 * 
 * 
 * 
*/

const express = require('express');

const {
    httpgetAllPowerUps,
    httpAddNewPowerUps,
    httpDeletePowerUps,
} = require('./powerUp.controller');

const powerUpRouter = express.Router();

powerUpRouter.get('/', httpgetAllPowerUps); //can use '/' here since we defined '/LeaderBoard in app.js'
powerUpRouter.post('/', httpAddNewPowerUps);
powerUpRouter.delete('/:id', httpDeletePowerUps);

module.exports = powerUpRouter;