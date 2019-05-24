//lesson 183 imported lowdash path and url(url comes with node)
const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')



const mongoose = require('mongoose')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')

const Mailer = require('../services/Mailer')

const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

//somehow the following line allows us to side-step testing?  Why would we want to side-step future testing?
const Survey = mongoose.model('surveys')

module.exports = app =>{
    //added in 143 to handle redirect after user clicks y/n in email survey
    app.get('/api/surveys/thanks', (req, res)=>{
        res.send('thanks for voting')
    })
    
    
    //lesson 177 set up route for sendgrid tunnel
    app.post('/api/surveys/webhooks', (req, res) => {
       //187 refactor
        const p = new Path('/api/surveys/:surveyId/:choice')
        //187 refactor using lodash library chain function, chain is an advanted js/lodash topic
            _.chain(req.body)
            .map(({ email, url }) =>{
                const match = p.test(new URL(url).pathname)
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice}
                }
            })
            console.log()
            .compact()
            .uniqBy('email', 'surveyId')
            //191: destructure event to surveyId, email, choice
            .each(({ surveyId, email, choice }) =>{

            //191 even though the following is a promise, sendgrid does all the work, so we don't need to asynch it.  ?
                Survey.updateOne(
                {
                    //191: gotcha: mongo id's start with _:
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true }
                 //191 gotcha:   .exec()
                }).exec()
               
            })
            .value()
        res.send({})
    })




    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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
        const mailer = new Mailer(survey, surveyTemplate(survey))
        try{
        await mailer.send()
        await survey.save()
        req.user.credit -= 1
        const user = await req.user.save()
        res.send(user)
        }catch (err){
            res.status(422).send(err)
        }
    })
}