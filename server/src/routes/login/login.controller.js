const path = require('path');
const passport = require('passport');
const {Strategy} = require('passport-google-oauth20');
const { builtinModules } = require('module');
const cookieSession = require('cookie-session');

function Passport(){
    passport.use(new Strategy(AUTH_OPTIONS, verifyCallback)) //passport will help us go through the oath flow, so we don't need to keep track of all the requests to google servers and responses

    // save session to cookie
    passport.serializeUser((user, done) => {
    done(null, user.id);
    })

    // reading session from cookie
    passport.deserializeUser((id, done) => {
    //Server side session -> look up with user id in the database to retrieve other information
    // User.findById(id).then(user => {
    //   done(null, user); //choose only user id to limit data for session
    // })
    //client side
    done(null, id);
    })
}

module.exports = {
    cookies, 
    checkLoggedIn,
}