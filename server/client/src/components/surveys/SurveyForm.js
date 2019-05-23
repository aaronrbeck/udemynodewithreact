//survey form shows a form for user to add inpu

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'

//reduxForm allows our component to communicate with the store at the top of our application
//reduxForm is similar to the connect function we used before


class SurveyForm extends Component {
//helper function that helps render the surveyfields into this form
renderFields(){
    return ( 
        <div>
            <Field 
                label = "Survey Title"
                type="text" 
                name="title" 
                component={SurveyField}
            />
            <Field
                label="Subject"
                type="text"
                name="subject"
                component={SurveyField}
            />
            <Field
                label="Email Body"
                type="text"
                name="body"
                component={SurveyField}
            />
            <Field
                label="Recipient List"
                type="text"
                name="emails"
                component={SurveyField}
            />
        </div>
    );

    
    }


    render() {

        return (
            <div>
                {/* Field is useless with out props */}
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                {this.renderFields()}
                <button type="submit">Submit</button> 
                </form>
            </div>
        )
    }
}
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm)