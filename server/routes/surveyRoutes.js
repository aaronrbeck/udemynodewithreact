const mongoose = require('mongoose')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')


//somehow the following line allows us to side-step testing?  Why would we want to side-step future testing?
const Survey = mongoose.model('surveys')

module.exports = app =>{
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        //check to see if user is logged in accomplished with requireLogin parameter
        //check to make sure they have enough credits to make a new survey accomplished with requireCredits parameter
        //
        const {title, subject, body, recipients } = req.body
        //more common in real world to do back end design before front end design

        const survey = new Survey({
            title,
            subject,
            body,
            
        })
    
    })
}