//import express from 'express' format is es2015 module format
// node.js can not use es2016 modules so
//on the server side of things we will use common module
//import syntax:
const express = require('express');

//bring in passport
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys')


//inside a single node project we may have several different express
//applications, the following app object is used to set up configuration that will 
//listen for incoming requests
//so  a little better understainding, but still not totally clear
//on why express is stuffed into the app object
//I guess it allows us to make multiple objects with express inside them?
const app = express();


//passport.use - general strategy

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, 
(accessToken) =>{
    console.log(accessToken)
}
)
);




//add a single rout handler - lesson 25
//scope: ['profile', 'email'] is an options object which specifies which access we want to have
//in our case we want access to profile and email.  profile and email are google predefined things
//other options could include asking access to user's contact list or all images in drive account, etc.
app.get(
    '/auth/google',
    passport.authenticate('google', {
    scope: ['profile', 'email']
})
)



//app object represents the underlying express server
//app.get creates a new route handler
//    / is the route portion part of the handler
// res.send means that we want to close the request and immediatly send back a response

//anything we do in express will be variations on the following:
        //this was a test rout that we commented out once we started google oauth
        // app.get('/', (req, res)=>{
        //     res.send({hi: 'buddy'});
        // });

//add a line that will allow our app to listen to a port dynamically:
//when heroku runs our app it can inject environment variables
//so when heroku defines a port in the underlying environment us that port
//   or (||) use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);


