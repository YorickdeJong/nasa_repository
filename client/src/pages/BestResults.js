import { useMemo } from "react";
import { withStyles, Appear, Paragraph, Link, Table } from "arwes";
import Clickable from "../components/Clickable";


const styles = () => ({
    link: {
        color: "red",
        textDecoration: "none",
    },
});

const BestResults = props => {
    const {
        entered,
        bestResults,
        submitBestResults,
        classes,
        deleteResult,
    } = props;

    var index = 0;
    // display results/ leaderboard
    const tableBody = useMemo(() => {
        return bestResults.map((bestResult) => {
            if (bestResult.round === 3)
            {
                index += 1;
                return <tr key={bestResult.key}>
                    <td>
                        <Clickable style={{ color: "red" }}>
                            <Link className={classes.link} onClick={() => deleteResult(bestResult.key)}>
                                ✖
                            </Link>
                        </Clickable>
                    </td>
                    <td>{index}</td>
                    <td>{bestResult.robotId}</td>
                    <td>{bestResult.round}</td>
                    <td>{bestResult.totalTime}</td>
                </tr>
            }});   
    }, [bestResults, deleteResult, classes.link]);


    return <Appear id="bestResults" animate show={entered}>
        <Paragraph>Hall Of Fame</Paragraph>
        <Table animate show={entered}>
            <table style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        <th style={{ width: "3rem" }}></th>
                        <th style={{ width: "11rem" }}>Rank</th>
                        <th style={{ width: "11rem" }}>Robot ID</th>
                        <th style={{ width: "11rem" }}>Round</th>
                        <th style={{ width: "11rem" }}>Total Time</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        </Table>
    </Appear>;
};

export default withStyles(styles)(BestResults);