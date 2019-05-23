const mongoose = require('mongoose')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')

const Mailer = require('../services/Mailer')

const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

//somehow the following line allows us to side-step testing?  Why would we want to side-step future testing?
const Survey = mongoose.model('surveys')

module.exports = app =>{
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        //check to see if user is logged in accomplished with requireLogin parameter
        //check to make sure they have enough credits to make a new survey accomplished with requireCredits parameter
        //
        const {title, subject, body, recipients } = req.body
        //more common in real world to do back end design before front end design


        //so far the survey exists in local memory, but has not been persisted to our db
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email =>  ({email: email.trim()})),
            //the following id is a mongo generated id - how do I know that?
            _user: req.user.id,
            dateSent: Date.now()
        
        })

        //good place to send email
        //how do we use a class to send the email?
        const mailer = new Mailer(survey, templateTemplate(survey))
    })
}