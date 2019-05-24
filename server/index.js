

//import express from 'express' format is es2015 module format
// node.js can not use es2016 modules so
//on the server side of things we will use common module
//import syntax:
const express = require('express');
const mongoose = require('mongoose')

//we are using cookie-session for this project, but because
//cookies can only store about 4kb of info, so for future projects
//if you need to store more info consider using the express session module found on npm
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')
//import the survey mongoose model class
require('./models/Survey')
require('./services/passport')


//somewhere around lesson 184 I ran into a URL string parser
//deprecation warning.  via q/a someone suggested modifying 
//this mongoose.connect statement from the , { useNewParser: true} onwards
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
        // .then(()=>console.log("MongoDB Connected"))
        .catch(err=>console.log(err))

//inside a single node project we may have several different express
//applications, the following app object is used to set up configuration that will 
//listen for incoming requests
//so  a little better understainding, but still not totally clear
//on why express is stuffed into the app object
//I guess it allows us to make multiple objects with express inside them?
const app = express();

app.use(bodyParser.json())
//the following app.use calls are considered middlewar
app.use(
        cookieSession({
                maxAge: 30 * 24 * 60 * 60 * 1000,
                keys: [keys.cookieKey]
        })
)
app.use(passport.initialize())
app.use(passport.session())


require('./routes/authRoutes')(app);
//billing routes
require('./routes/billingRoutes')(app)
//survey route
require('./routes/surveyRoutes')(app)

//make sure express behave properly when in production environment:
if (process.env.NODE_ENV === 'production'){
        //express will server up production assets
        //like our main.js file, or main.css file
        app.use(express.static('client/build'))
        //express will server up the index.html file
        //if it doesnt recognize the route
        const path = require('path')
        app.get('*', (req, res) =>{
                res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        })
}










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


