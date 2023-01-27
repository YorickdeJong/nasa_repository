import { useMemo, useState, useEffect, useCallback } from "react";
import { withStyles, Appear, Paragraph, Footer, Button, Link, Table } from "arwes";
import Clickable from "../components/Clickable";
import useSWR from "swr";

const fetcher = (url) => fetcher(url).then((res) => res.json());

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
        page, 
        pageCount,
        deleteResult,
        submitBestResults,
        handlePrevious,
        handleNext
    } = props;


    //Submit new racing results to the hall of fame, such that the current race results
    //can be deleted
    useEffect(() => {
        submitBestResults(results);
    }, []);

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


    return <Appear id="results" animate show={entered}>
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
        <Footer animate>
            <Button animate layer='success' disabled = {page === 1} onClick = {() => handlePrevious()}>
                Previous
            </Button>
            <Button animate layer='success' disabled = {page === pageCount} onClick = {() => handleNext()}>
                Next
            </Button>
        </Footer>
    </Appear>;
};

export default withStyles(styles)(Results);