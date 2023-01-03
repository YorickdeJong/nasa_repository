const API_URL = 'http://localhost:9000';  //changes with each internet connection!

// Load launches, sort by flight number, and return as JSON.
async function httpGetResults() {
    const response = await fetch(`${API_URL}/LeaderBoard`);
    const fetchedLeaderBoard = await response.json();
    return fetchedLeaderBoard;
}

// Delete launch with given ID.
async function httpDeleteResult(id) {
    return await fetch(`${API_URL}/LeaderBoard/${id}`, { //fails to fetch but does delete
        method: "DELETE",
    });
}

export {
    httpGetResults,
    httpDeleteResult
};