const requireLogin = require('../middlewares/requireLogin')


module.exports = app =>{
    app.post('/api/surveys', requireLogin, (req, res) => {
        //check to see if user is logged in

        //check to make sure they have enough credits to make a new survey
        
    })
}