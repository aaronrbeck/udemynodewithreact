const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')

module.exports = app =>{
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        //check to see if user is logged in accomplished with requireLogin parameter
        //check to make sure they have enough credits to make a new survey accomplished with requireCredits parameter
        
    })
}