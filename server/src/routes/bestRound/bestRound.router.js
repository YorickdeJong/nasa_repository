/* Router defines how an application's endpoint respond to a clients request
 * express object corresponds to http methods -> ex: app.get for get requests
 * express is used as middleware
 * 
 * 
 * 
*/

const express = require('express');

const {
    httpgetAllBestRound,
    httpAddNewBestRound,
    httpDeleteBestRound,
} = require('./bestRound.controller');

const trackRouter = express.Router();

trackRouter.get('/', httpgetAllBestRound); //can use '/' here since we defined '/LeaderBoard in app.js'
trackRouter.post('/', httpAddNewBestRound);
trackRouter.delete('/:id', httpDeleteBestRound);

module.exports = trackRouter;