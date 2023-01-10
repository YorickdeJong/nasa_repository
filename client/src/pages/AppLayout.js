import { useState } from "react";
import {
    Routes,
    Route,
} from "react-router-dom";

import { Frame, withStyles } from "arwes";

import Results from "./Results";
import BestResults from "./BestResults";

import useResult from "../hooks/useResult";
import Header from "../components/Header";
import Centered from "../components/Centered";

//custom styles
const styles = () => ({
    content: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        margin: "auto",
    },
    centered: {
        flex: 1,
        paddingTop: "20px",
        paddingBottom: "10px",
    },
});

//Components definition
const AppLayout = props => {
    const { sounds, classes } = props;

    //Animations
    const [frameVisible, setFrameVisible] = useState(true);
    const animateFrame = () => {
        setFrameVisible(false);
        setTimeout(() => {
        setFrameVisible(true);
        }, 600);
    };

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

    //Different react components that make up the app layout
    return <div className={classes.content}>
        <Header onNav={animateFrame} />
        <Centered className={classes.centered}>
        <Frame animate
            show={frameVisible}
            corners={4}
            style={{ visibility: frameVisible ? "visible" : "hidden" }}>
            {anim => (
                <div style={{ padding: "20px" }}>
                    <Routes>
                        <Route exact path="/" element={<Results
                            entered={anim.entered}
                            results={results}
                            isPendingResult={isPendingResult}
                            deleteResult={deleteResult} 
                            submitBestResults = {submitBestResults}/>}
                            >
                        </Route>
                        <Route exact path="/LeaderBoard" element={<Results
                            entered={anim.entered}
                            results={results}
                            isPendingResult={isPendingResult}
                            deleteResult={deleteResult} 
                            submitBestResults = {submitBestResults}/>}
                            >
                        </Route>
                        <Route exact path="/HallOfFame" element={<BestResults
                            entered={anim.entered}
                            bestResults={bestResults}
                            isPendingResult={isPendingResult}
                            deleteResult={deleteResult} />}
                            >
                        </Route>
                    </Routes>
                </div>
            )}
        </Frame>
        </Centered>
    </div>;
};

export default (withStyles(styles)(AppLayout));