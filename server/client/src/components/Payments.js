import React, { Component } from 'react'
import StripeCheckout from 'react-strip-checkout'

class Payments extends Component {
    render () {
        debugger
        return(
        <StripeCheckout
        //US dollars in cents is default currency
        amount = {500}
        //poorly named property, token: expencts a callback function called after retrieved an api key from stripe
        token={token => console.log(token)}
        stripeKey = {process.env.REACT_APP_STRIPE_KEY}
        />

        )
    }
}
export default Payments