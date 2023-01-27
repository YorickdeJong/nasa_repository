/* The controller reacts to an incomming request and reacts accordingly
 * In our case we want to read, write, update and delete
 * Await data from models and set status of data in this script
 * 
 *    
 */

const {
    getAllResults,
    addNewResult,
    deleteResultId,
    existsResultWithId,
    dataCount
} = require('../../models/round/round.model');

const { getPagination } = require('../../services/query');

//returns response
async function httpgetAllResults(req, res) {
    try{   
        const count = dataCount();
        const {skip, limit, pageCount} = getPagination(req.query, count);
        const results = res.status(200).json(await getAllResults(skip, limit));
        console.log(results.round);
        return {
            pagination: {
                count, 
                pageCount
            }, 
            results        
        };
    }
    catch (e) {
        console.error(e);
        return e;
    }
}
async function httpAddNewResult(req, res) {
    const result = req.body; //gets data from launch like mission, rocket, launchdata and target

    //error handling post requests
    if (!result.key || !result.robotId || !result.round ||  !result.totalTime) {
        return res.status(400).json({
            error: 'Missing required properties: key/ robotId/ round/ roundTime/totalTime',
        });
    }

    //new launch is added here
    await addNewResult(result);
    return res.status(201).json(result) //created
}

async function httpDeleteResult(req, res) {
    const Id = Number(req.params.id); //gets specific id 

    const existsResult = await existsResultWithId(Id)
    //if launch doesn't exist
    if (!existsResult) {
        return res.status(404).json({
            error: 'Result not found',
        });
    }

    //if launch does exist
    const canceled = await deleteResultId(Id);
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
    httpgetAllResults,
    httpAddNewResult,
    httpDeleteResult,
}