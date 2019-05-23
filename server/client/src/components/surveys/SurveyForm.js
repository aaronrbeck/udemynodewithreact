//survey form shows a form for user to add inpu

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'


//reduxForm allows our component to communicate with the store at the top of our application
//reduxForm is similar to the connect function we used before


class SurveyForm extends Component {
    render() {
        return (
            <div>
                {/* Field is useless with out props */}
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}
                >
                <Field
                //three required properties for a reduxForm field element:
                type="text"
                // redux field will take the inputed value and store it in our redux
                // store with a key of name (surveyTitle in this case)
                name="surveyTitle"
                //identify that we want an html input field of type text
                component="input"
                value="surveyTitle"
                />
                <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm)