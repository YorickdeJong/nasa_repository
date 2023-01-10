const API_URL = 'http://localhost:9000';  //changes with each internet connection!

// Load launches, sort by flight number, and return as JSON.
async function httpGetResults() {
    const response = await fetch(`${API_URL}/LeaderBoard`)
    const fetchedLeaderBoard = await response.json();
    return fetchedLeaderBoard.sort((a,b) => {
        return a.round - b.round;
    })
}

async function httpGetBestResults(){
    const response = await fetch(`${API_URL}/HallOfFame`);
    const fetchedLeaderBoard = await response.json();
    return fetchedLeaderBoard.sort((a,b) => {
        return a.totalTime - b.totalTime;
    });
}

async function httpGetPowerUp(){
    const response = await fetch(`${API_URL}/HallOfFame`);
    const fetchedPowerUp = await response.json();
}


// Delete launch with given ID.
async function httpDeleteResult(id) {
    return await fetch(`${API_URL}/LeaderBoard/${id}`, { //fails to fetch but does delete
        method: "DELETE",
    });
}

// Delete launch with given ID.
async function httpDeleteBestResults(id) {
    return await fetch(`${API_URL}/HallOfFame/${id}`, { //fails to fetch but does delete
        method: "DELETE",
    });
}

// Delete launch with given ID.
async function httpDeletePowerUp(id) {
    return await fetch(`${API_URL}/PowerUp/${id}`, { //fails to fetch but does delete
        method: "DELETE",
    });
}


// Submit given launch data to launch system.
async function httpSubmitBestResult(result) {
  //need to catch if succesful -> otherwise its false
  try
  {
    return await fetch(`${API_URL}/HallOfFame`, {
      method: "post",
      headers: { //need to specify what data type we are sending into the body
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result), //convert obj to string
    }); //fetch function defaults to the get method
  }
  catch(err){
    console.log("httpSubmitRequest failed");
    console.log(err);
    return {
      ok: false,
    };
  }  
}


export {
    httpGetResults,
    httpGetBestResults,
    httpGetPowerUp,
    httpDeleteResult,
    httpDeleteBestResults,
    httpDeletePowerUp,
    httpSubmitBestResult
};