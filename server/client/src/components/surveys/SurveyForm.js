//survey form shows a form for user to add inpu

import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'

//lesson 156 DRY things up with an array
//we will use the lodash library map function




//reduxForm allows our component to communicate with the store at the top of our application
//reduxForm is similar to the connect function we used before


class SurveyForm extends Component {
//helper function that helps render the surveyfields into this form
renderFields(){
    //return mapped the fields array and 
    return _.map(formFields, ({ label, name }) =>{
        return <Field 
                key={name}
                component={SurveyField} 
                type="text" 
                label={label} 
                name={name} 
                />
    })
}

    
    


    render() {

        return (
            <div>
                {/* Field is useless with out props */}
                <form onSubmit={this.props.handleSubmit(
                    // lesson 164 callback function that kicks us to surveyformreview page:

                    this.props.onSurveySubmit)}>
                
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">cancel</Link>
                <button type="submit" className="teal btn-flat right white-text">
                    next
                    <i className="material-icons right">done</i>
                    </button> 
                </form>
            </div>
        )
    }
}

//reduxforms gives us access to the values (which has body, title, etc)
function validate(values){
    const errors = {}
    errors.recipients = validateEmails(values.recipients || '')

    //use the lodash library to run a for each
    //loop over our formField array to validate
    //whether or not any fields had been left empty

    _.each(formFields, ({ name }) => {
        //if there is no value, attach an error to the reduxForm error object
        if (!values[name]){
            errors[name] = 'You must provide a value'
        }

    })
    

    return errors
}


export default reduxForm({
    validate,
    form: 'surveyForm',
    //lesson 166 fix issue where form data does not persist between new and review
    destroyOnUnmount: false
})(SurveyForm)