/* The controller reacts to an incomming request and reacts accordingly
 * In our case we want to read, write, update and delete
 * Await data from models and set status of data in this script
 * 
 *    
 */

const {
    getBestRound,
    addNewBestRound,
    deleteBestRoundId,
    existsBestRoundWithId
} = require('../../models/bestRound/bestRound.model');

//returns response
async function httpgetAllBestRound(req, res) {
    return res.status(200).json(await getBestRound());
}

async function httpAddNewBestRound(req, res) {
    const result = req.body; //gets data from launch like mission, rocket, launchdata and target

    //error handling post requests
    if (!result.key || !result.robotId || !result.round || !result.totalTime) {
        return res.status(400).json({
            error: 'Missing required properties: key/ robotId/ round/ totalTime for BestRound',
        });
    }

    //new launch is added here
    await addNewBestRound(result);
    return res.status(201).json(result) //created
}

async function httpDeleteBestRound(req, res) {
    const Id = Number(req.params.id); //gets specific id 

    const existsResult = await existsBestRoundWithId(Id)
    if (!existsResult) {
        return res.status(404).json({
            error: 'Result not found',
        });
    }

    //if launch does exist
    const canceled = await deleteBestRoundId(Id);
    if (!canceled) {
        return res.status(400).json({
            error: 'Result not deleted',
        })
    }
    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpgetAllBestRound,
    httpAddNewBestRound,
    httpDeleteBestRound,
}