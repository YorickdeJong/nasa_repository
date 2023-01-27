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
    httpSubmitBestResult,
    httpsGoogleSignIn
} from './requests';

function useResult() {
    const [results, saveResults] = useState([]);
    const [bestResults, saveBestResults] = useState([]);
    const [powerUps, savePowerUps] = useState([]);
    const [isPendingResult, setPendingResult] = useState(false);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Save fetched data in Result, use a callback here since we don't
    // want to reload data if it has not changed since the previous render
    // results array is set here
    const getResult = useCallback(async () => {
        const fetchedResults = await httpGetResults(page);
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

    useEffect(() => {
        if(results){
            setPageCount(results.pagination);
        }
    }, [results])

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        console.log(access_token)
        if (access_token) {
        console.log(isLoggedIn)
        setIsLoggedIn(true);
        } else {
        console.log(isLoggedIn)
        setIsLoggedIn(false);
        }
    }, []);
    
    //     const responseGoogle = (response) => {
    //     console.log(response)
    //     if (response.accessToken) {
    //     setIsLoggedIn(true);
    //     setAccessToken(response.accessToken);
    //     } else {
    //     console.log('Error: ' + response.error);
    //     }
    // }
    //SET PAGES
    function handlePrevious(){
        setPage((p) => {
            if (p === 1)
            {
                return p;
            }
            return p - 1;
        });
    }

    function handleNext(){
        setPage((p) => {
            if (p === pageCount)
            {
                return p;
            }
            return p + 1;
        });
    }

    return {
        results,
        bestResults,
        powerUps,
        isPendingResult,
        page,
        pageCount,
        isLoggedIn,
        deleteResult,
        deleteBestResults,
        deletePowerUp,
        submitBestResults,
        handlePrevious,
        handleNext,
        httpsGoogleSignIn
    };
}

export default useResult;