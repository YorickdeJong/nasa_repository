/* model.js defines operations that are performed on aquired data from database 
 * We define a load function, which loads data from the database
 * save function -> saves data into database
 * Search function to search objects inside database 
 * Delete function, to delete objects from database 
 */

const trackDatabase = require('./track.mongo');


//Test
const roundTest = {
    key: 1,
    robotId: 3,
    round: 2,
    time: new Date("2023-01-03")
}

const roundTest2 = {
    key: 2,
    robotId: 1,
    round: 1,
    time: new Date("2023-01-03T07:12:39.301+00:00")
}

saveResult(roundTest);
saveResult(roundTest2);

//GET, POST, DELETE
async function getAllResults() {
    return await trackDatabase
        .find({}, {
            '_id': 0, '__v': 0
        })
        .catch(err => {
            console.log(err);
        })

}

async function addNewResult(result) {
    //Copy all enumarble properties from source object
    const newResult = Object.assign(result, {
    })

    await saveResult(newResult)
}

async function deleteResultId(Id) {
    const deleted = await trackDatabase.findOneAndDelete({
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

async function existsResultWithId(Id) //Adjusting for mangoDB, we are now searching in mango to see if the launchId is equal to the flightNumber
{
    return await trackDatabase.findOne({
        key: Id,
    });
}


//checks if result is already in database and saves accordingly
async function saveResult(result) {

    //await trackDatabase.findOneAndUpdate( //instead of updateOne we use findOneAndUpdate -> only returns the properties that we set in our update
    await trackDatabase.updateOne( //instead of updateOne we use findOneAndUpdate -> only returns the properties that we set in our update
        {
            key: result.key,
            robotId: result.robotId,
            round: result.round,
            time: result.time
        }, 
        {       
            key: result.key, 
            roboId: result.robotId,
            round: result.round,
            time: result.time
        },
        {
            upsert: true,
        });
}


module.exports = {
    getAllResults,
    addNewResult,
    deleteResultId,
    existsResultWithId
};