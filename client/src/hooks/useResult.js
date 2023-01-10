/* fetched data gets put into useEffects and useCallback as to make fetching possible (useEffect)
 * and add optimisation (useCallback)
 */

import { useCallback, useEffect, useState } from "react";

import {
    httpGetResults,
    httpGetBestResults,
    httpGetPowerUp,
    httpDeleteResult,
    httpDeleteBestResults,
    httpDeletePowerUp,
    httpSubmitBestResult
} from './requests';

function useResult() {
    const [results, saveResults] = useState([]);
    const [bestResults, saveBestResults] = useState([]);
    const [powerUps, savePowerUps] = useState([]);
    const [isPendingResult, setPendingResult] = useState(false);

    // Save fetched data in Result, use a callback here since we don't
    // want to reload data if it has not changed since the previous render
    // results array is set here
    const getResult = useCallback(async () => {
        const fetchedResults = await httpGetResults();
        saveResults(fetchedResults);
    }, []);    
    
    //UPLOAD TO HALLOFFAME
    const getBestResults = useCallback(async () => {
        const fetchedBestResults = await httpGetBestResults();
        saveBestResults(fetchedBestResults);
    }, []);

    //UPLOAD TO HALLOFFAME
    const getPowerUps = useCallback(async () => {
        const fetchedPowerUp = await httpGetPowerUp();
        savePowerUps(fetchedPowerUp);
    }, []);

    const deleteResult = useCallback(async (id) => {
        await httpDeleteResult(id);
        getResult();
    }, [getResult]);    

    const deleteBestResults = useCallback(async (id) => {
        await httpDeleteBestResults(id);
        getBestResults();
    }, [getResult]);    


    const deletePowerUp = useCallback(async (id) => {
        await httpDeletePowerUp(id);
        getPowerUps();
    }, [getPowerUps]);    


    const submitBestResults = useCallback(async (raceResult) => {
        raceResult.map(async (bestResult) => {
            delete bestResult.roundTime;
            if (bestResult.round === 3)
            {
                const key = bestResult.key;
                const robotId = bestResult.robotId;
                const round = bestResult.round;
                const totalTime = bestResult.totalTime;
                
                const response = await httpSubmitBestResult({
                    key,
                    robotId,
                    round, 
                    totalTime
                });

                const success = response.ok; //.ok tests if an expression is true or not
                if (success) {
                    getBestResults();
                } 
                else{
                    console.log('failed to submit best results')
                }
            }
        });
        
    }, [getBestResults])

    // Execute getResult() in useEffect, since we fetch data -> useEffect triggers getResult() 
    // after every rerender of the DOM
    useEffect(() => {
        getResult();
        getBestResults(); 
        getPowerUps();
    }, []);

    return {
        results,
        bestResults,
        powerUps,
        isPendingResult,
        deleteResult,
        deleteBestResults,
        deletePowerUp,
        submitBestResults,
    };
}

export default useResult;