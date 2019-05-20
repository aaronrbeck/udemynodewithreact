//bring in passport
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')


//turns a mongoose model instance into an id
//user.id is the token that gets stuffed into the cookie
//
passport.serializeUser((user, done)=>{
    done(null, user.id);
})


//now we will turn an id back into a mongoose model instance
passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then(user => {
        done(null, user);

    })
})


//passport.use - general strategy

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    //let passport know that we are ok with heroku as a proxy server during the oauth process:
    proxy: true
},
    (accessToken, refreshToken, profile, done) => {
       User.findOne({ googleId: profile.id })
       .then((existingUser)=>{
           if(existingUser){
//we already have a record with the given profile ID
            done(null, existingUser)
            }else{
               //we don't have a user record with this Id, make a new record
               new User({ googleId: profile.id })
               .save()
               .then(user => done(null, user))

            }
       })
    }
)
);
