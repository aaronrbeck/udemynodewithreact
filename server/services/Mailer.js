const sendgrid = require('sendgrid')
const helper = sendgrid.mail

const keys = require('../config/keys')

class Mailer extends helper.Mail{
    constructor({ subject, recipients, }, content){
        super()
        this.from_email = new helper.Email('no-reply@emaily.com')
        this.subject = subject
        this.body = new helper.Content('text/html', content)
        this.recipients = this.formatAddresses(recipients)
        //actually add the body to the content:
        //.addContent is a built in sendgrid function
        this.addContent(this.body)
        this.addClickTracking()
        this.addRecipients()
        
    }

    formatAddresses(recipients){
        return recipients.map(({ email }) => {
            return new helper.Email(email)
        })
    }
    //enable click tracking - also a built in sendgrid capability
    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings()
        const addClickTracking = new helper.ClickTracking(true, true)
    
        trackingSettings.setClickTracking(ClickTracking)
        this.addTrackingSettings(trackingSettings)
    }
}

module.exports = Mailer