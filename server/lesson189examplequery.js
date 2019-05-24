email = 'a@a.com'
choice = 'yes' || 'no'
//we want entire query to happen in mongo world, not on our express server
Survey.updateOne({
    id: surveyId,
    recipients: {
        $elemMatch: { email: email, responded: false }
    }
},{
//taking care of choice property
//$inc is a mongo operator, inc is increment
//[choice] does not create an array, it is es2016 key interpolation syntax
$inc: { [choice]: 1 },
//another mongo operator
$set: { 'recipients.$.responded': true }
})