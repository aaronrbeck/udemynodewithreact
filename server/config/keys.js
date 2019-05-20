//keys.js - figure out what set of credentials to return

//when you deploy to heroku there is an existing environemtne variable
//called node_env which tells us if we are running in a production environment

if (process.env.NODE_ENV === 'production'){
    //return production keys
    module.exports = require('./prod')
}else { 
        //return dev keys
        module.exports = require ('./dev')
    }
