/* Defines Server */
const fs = require('fs');
const https = require('https');
const app = require('./app');
const path = require('path');

const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 9000;

const server = https.createServer({
  key: fs.readFileSync(__dirname + '/keys/key.pem'), //need a key to and a certificate
  cert: fs.readFileSync(__dirname + '/keys/cert.pem'),
}, app);

async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`listening on port: ${PORT}`);
    });
}

startServer();