//------This Script Sets up Mongo Atlas Database----------// 
const mongoose = require('mongoose');

//PASTE PASSWORD
const MONGO_URL = 'mongodb+srv://Yorick2:xfN23T0Ix3Q8VyJF@altenproject2.e7whxws.mongodb.net/?retryWrites=true&w=majority';

//event emitters for mongoose -> can be put anywhere in our file below the mongoose require function
mongoose.connection.once('open', () => //once only triggers upton execution
{
    console.log('MongoDB connection ready');
}); //event emitter

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}
module.exports =
{
    mongoConnect,
    mongoDisconnect,
};