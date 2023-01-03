import { useState } from "react";
import {
    Routes,
    Route,
} from "react-router-dom";

import { Frame, withStyles } from "arwes";
import Results from "./Results";
import useResult from "../hooks/useResult";

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
    const [frameVisible, setFrameVisible] = useState(true);

    const {
        results,
        isPendingResult,
        deleteResult,
    } = useResult();

    //Different react components that make up the app layout
    return <div className={classes.content}>
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
                            deleteResult={deleteResult} />}>
                        </Route>
                        <Route exact path="/LeaderBoard" element={<Results
                            entered={anim.entered}
                            results={results}
                            isPendingResult={isPendingResult}
                            deleteResult={deleteResult} />}>
                        </Route>
                    </Routes>
                </div>
            )}
        </Frame>
    </div>;
};

export default (withStyles(styles)(AppLayout));