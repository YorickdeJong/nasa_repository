import { useMemo } from "react";
import { withStyles, Appear, Paragraph, Link, Table } from "arwes";
import Clickable from "../components/Clickable";


const styles = () => ({
    link: {
        color: "red",
        textDecoration: "none",
    },
});

const Results = props => {
    const {
        entered,
        results,
        classes,
        deleteResult,
    } = props;

    // display results/ leaderboard
    const tableBody = useMemo(() => {
        return results.map((result) => {
            return <tr key={result.key}>
                <td>
                    <Clickable style={{ color: "red" }}>
                        <Link className={classes.link} onClick={() => deleteResult(result.key)}>
                            ✖
                        </Link>
                    </Clickable>
                </td>
                <td>{result.robotId}</td>
                <td>{result.round}</td>
                <td>{result.roundTime}</td>
                <td>{result.totalTime}</td>
            </tr>;
        });
    }, [results, deleteResult, classes.link]);


    return <Appear id="upcoming" animate show={entered}>
        <Paragraph>Racing Results</Paragraph>
        <Table animate show={entered}>
            <table style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        <th style={{ width: "3rem" }}></th>
                        <th style={{ width: "11rem" }}>Robot ID</th>
                        <th style={{ width: "11rem" }}>Round</th>
                        <th style={{ width: "11rem" }}>Round Time</th>
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

export default withStyles(styles)(Results);