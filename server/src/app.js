/*Contains all middleware code*/

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const LeaderBoardRouter = require('./routes/round/round.router');
const HallOfFameRouter = require('./routes/bestRound/bestRound.router');
const PowerUpRouter = require('./routes/powerUp/powerUp.router');

const app = express();

//security related features -> manages cross origin requests (allows for more websites to view data)
app.use(cors({
    origin: 'http://localhost:4000'
}));

//logging system
app.use(morgan('combined'));


app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));

app.use('/LeaderBoard', LeaderBoardRouter);
app.use('/HallOfFame', HallOfFameRouter);
app.use('/PowerUp', PowerUpRouter);


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});

module.exports = app;