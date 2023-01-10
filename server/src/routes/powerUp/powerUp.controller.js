/* The controller reacts to an incomming request and reacts accordingly
 * In our case we want to read, write, update and delete
 * Await data from models and set status of data in this script
 * 
 *    
 */

const {
    getAllPowerUps,
    addNewPowerUp,
    deletePowerUpId,
    existsPowerUpWithId
} = require('../../models/powerUp/powerUp.model');

//returns response
async function httpgetAllPowerUps(req, res) {
    return res.status(200).json(await getAllPowerUps());
}

async function httpAddNewPowerUps(req, res) {
    const powerUps = req.body; //gets data from launch like mission, rocket, launchdata and target

    //error handling post requests
    if (!powerUps.key || !powerUps.robotId || !powerUps.powerUp || !powerUps.totalTime) {
        return res.status(400).json({
            error: 'Missing required properties: key/ robotId/ powerUp /totalTime',
        });
    }

    //new launch is added here
    await addNewPowerUp(powerUps);
    return res.status(201).json(powerUps) //created
}

async function httpDeletePowerUps(req, res) {
    const Id = Number(req.params.id); //gets specific id 

    const existsPowerUps = await existsPowerUpWithId(Id)
    //if launch doesn't exist
    if (!existsPowerUps) {
        return res.status(404).json({
            error: 'powerUp not found',
        });
    }

    //if launch does exist
    const canceled = await deletePowerUpId(Id);
    if (!canceled) {
        return res.status(400).json({
            error: 'powerUp not deleted',
        })
    }
    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpgetAllPowerUps,
    httpAddNewPowerUps,
    httpDeletePowerUps,
}