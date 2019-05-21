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
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        //lesson 88 fix post login redirect
        (req, res) =>{
            res.redirect('/surveys')
        }
        )



    //lesson 46
    //ever route hander has 2 arguments: route, function user accesses
    //req.whatever - whatever is available via passport    
    app.get('/api/logout', (req, res) =>{
            req.logout();
            //lesson 89, fix logout redirect:
            res.redirect('/');
        })



    //lesson 45
app.get('/api/current_user', (req, res) => {
    res.send(req.user);
})

}

