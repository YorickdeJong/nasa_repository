/* Router defines how an application's endpoint respond to a clients request
 * express object corresponds to http methods -> ex: app.get for get requests
 * express is used as middleware
 * 
 * 
 * 
*/

const express = require('express');

const {
    httpgetAllResults,
    httpAddNewResult,
    httpDeleteResult,
} = require('./round.controller');

const roundRouter = express.Router();

roundRouter.get('/', httpgetAllResults); //can use '/' here since we defined '/LeaderBoard in app.js'
roundRouter.post('/', httpAddNewResult);
roundRouter.delete('/:id', httpDeleteResult);

module.exports = roundRouter;