/* fetched data gets put into useEffects and useCallback as to make fetching possible (useEffect)
 * and add optimisation (useCallback)
 */

import { useCallback, useEffect, useState } from "react";

import {
    httpGetResults,
    httpDeleteResult
} from './requests';

function useResult() {
    const [results, saveResults] = useState([]);
    const [isPendingResult, setPendingResult] = useState(false);

    // Save fetched data in Result, use a callback here since we don't
    // want to reload data if it has not changed since the previous render
    // results array is set here
    const getResult = useCallback(async () => {
        const fetchedResults = await httpGetResults();
        saveResults(fetchedResults);
    }, []);

    // Execute getResult() in useEffect, since we fetch data -> useEffect triggers getResult() 
    // after every rerender of the DOM
    useEffect(() => {
        getResult();
    }, [getResult]);

    const deleteResult = useCallback(async (id) => {
        await httpDeleteResult(id);

        // TODO: Set success based on response.
        getResult();
    }, [getResult]);

    return {
        results,
        isPendingResult,
        deleteResult,
    };
}

export default useResult;