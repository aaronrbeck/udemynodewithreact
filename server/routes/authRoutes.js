const passport = require('passport')


module.exports = (app) =>{
    //add a single rout handler - lesson 25
    //scope: ['profile', 'email'] is an options object which specifies which access we want to have
    //in our case we want access to profile and email.  profile and email are google predefined things
    //other options could include asking access to user's contact list or all images in drive account, etc.

    //lesson 26ish: user visits our auth/google url then google asks them if they want to grant us access to their info
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    )
    //lesson 27 after user grants the passport request with the token they grabbed from google we authenticate with that token
    app.get('/auth/google/callback', passport.authenticate('google'))
}