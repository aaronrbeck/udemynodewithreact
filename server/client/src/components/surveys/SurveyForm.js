//survey form shows a form for user to add inpu

import React, { Component } from 'react'
import { reduxForm } from 'redux-form'


//reduxForm allows our component to communicate with the store at the top of our application
//reduxForm is similar to the connect function we used before


class SurveyForm extends Component {
    render() {
        return (
            <div>
                hi from survey form
            </div>
        )
    }
}
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm)