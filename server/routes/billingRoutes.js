const keys = require('../config/keys')
const stripe = require ('stripe')(keys.stripeSecretKey)

module.exports = app => {
    app.post('/api/stripe', async (req, res) =>{
        //check to see if a user is signed in
        if (!req.user){
            return res.status(401).send({ error: 'you must be logged in to add credits'})
        }

        const charge = await stripe.charges.create({
            //logic to handle the strip token
            //specify on back-end charge amount in us cents
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        })
        //update user number of credits
            //reference the person
            req.user.credits += 5
            //save changes asyncronously:
            const user = await req.user.save()
            //call with user again to see the updates
            res.send(user)

    })

}