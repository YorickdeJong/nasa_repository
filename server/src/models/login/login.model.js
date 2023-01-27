
//with this function we can compare users password to a password in our database
function verifyCallback(accessToken, refreshToken, profile, done){ //Strategy takes in all these arguments
  console.log('Google profile', profile);
  done(null, profile); //done is passed if credentials are valid
}
