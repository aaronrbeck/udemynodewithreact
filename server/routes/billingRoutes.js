const keys = require('../config/keys')
const strip = require ('stripe)'(keys.stripeSecretKey)

module.exports = app => {
    app.post('/api/strip', (req, res) =>{
        //logic to handle the strip token

        //update user number of credits


    })

}