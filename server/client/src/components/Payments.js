import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'




class Payments extends Component {
    render () {
        return(
        <StripeCheckout
        //describe what people are buying:
        name="Emaily"
        description="$5 for 5 email credits"
        //US dollars in cents is default currency
        amount = {500}
        //poorly named property, token: expencts a callback function called after retrieved an api key from stripe
        token={token => this.props.handleToken(token)}
        stripeKey = {process.env.REACT_APP_STRIPE_KEY}
        >
        <button className="btn">
        Add Credits
        </button>
        </StripeCheckout>

        )
    }
}
export default connect(null, actions) (Payments)