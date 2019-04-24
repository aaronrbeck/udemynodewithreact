//import express from 'express' format is es2015 module format
// node.js can not use es2016 modules so
//on the server side of things we will use common module
//import syntax:
const express = require('express');
//inside a single node project we may have several different express
//applications, the following app object is used to set up configuration that will 
//listen for incoming requests
//so  a little better understainding, but still not totally clear
//on why express is stuffed into the app object
//I guess it allows us to make multiple objects with express inside them?
const app = express();


//app object represents the underlying express server
//app.get creates a new route handler
//    / is the route portion part of the handler
// res.send means that we want to close the request and immediatly send back a response

//anything we do in express will be variations on the following:
app.get('/', (req, res)=>{
    res.send({hi: 'there'});
});

app.listen(5000);


