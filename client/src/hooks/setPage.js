
import Results from "./Results";
import BestResults from "./BestResults";

const {
    results,
    bestResults,
    powerUps,
    isPendingResult,
    deleteResult,
    deleteBestResults,
    deletePowerUp,
    submitBestResults,
} = useResult();

const [page, setPage] = useState(1);
const [pageCount, setPageCount] = useState(0);

const {data, error} = useSWR(
    `https://localhost:4000?page=${page}`,
    fetcher
)

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