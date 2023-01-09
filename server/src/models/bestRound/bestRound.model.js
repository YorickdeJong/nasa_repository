/* model.js defines operations that are performed on aquired data from database 
 * We define a load function, which loads data from the database
 * save function -> saves data into database
 * Search function to search objects inside database 
 * Delete function, to delete objects from database 
 */

const bestRoundDatabase = require('./bestRound.mongo');

//GET, POST, DELETE
async function getBestRound() {
    return await bestRoundDatabase
        .find({}, {
            '_id': 0, '__v': 0
        })
        .catch(err => {
            console.log(err);
        })

}

async function addNewBestRound(result) {
    //Copy all enumarble properties from source object
    const newResult = Object.assign(result, {
    })

    await saveBestRound(newResult)
}

async function deleteBestRoundId(Id) {
    const deleted = await bestRoundDatabase.findOneAndDelete({
        key: Id,
    }, (err, res) => {
        if (err) {
            console.log("Failed to delete from database");
            return false;
        }
        else {
            console.log("Deleted item from database");
            return true;
        }
    })
    .clone().catch(function (err) { console.log(err) });

}

async function existsBestRoundWithId(Id) //Adjusting for mangoDB, we are now searching in mango to see if the launchId is equal to the flightNumber
{
    return await bestRoundDatabase.findOne({
        key: Id,
    });
}


//checks if result is already in database and saves accordingly
async function saveBestRound(result) {

    //await trackDatabase.findOneAndUpdate( //instead of updateOne we use findOneAndUpdate -> only returns the properties that we set in our update
    await bestRoundDatabase.updateOne( //instead of updateOne we use findOneAndUpdate -> only returns the properties that we set in our update
        {
            key: result.key,
            robotId: result.robotId,
            round: result.round,
            totalTime: result.totalTime
        }, 
        {       
            key: result.key, 
            roboId: result.robotId,
            round: result.round,
            totalTime: result.totalTime
        },
        {
            upsert: true,
        });
}


module.exports = {
    getBestRound,
    addNewBestRound,
    deleteBestRoundId,
    existsBestRoundWithId
};