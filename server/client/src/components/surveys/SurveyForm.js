//survey form shows a form for user to add inpu

import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'


//lesson 156 DRY things up with an array
//we will use the lodash library map function

const FIELDS = [
    { label:'Survey Title', name:'title'},
    { label:'Subject', name:'subject'},
    { label:'Email Body', name:'body'},
    { label:'Recipient List', name:'emails'}

]



//reduxForm allows our component to communicate with the store at the top of our application
//reduxForm is similar to the connect function we used before


class SurveyForm extends Component {
//helper function that helps render the surveyfields into this form
renderFields(){
    //return mapped the fields array and 
    return _.map(FIELDS, ({ label, name }) =>{
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
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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
    errors.emails = validateEmails(values.emails || '')

    //use the lodash library to run a for each
    //loop over our FIELDS array to validate 
    //whether or not any fields had been left empty

    _.each(FIELDS, ({ name }) => {
        //if there is no value, attach an error to the reduxForm error object
        if (!values[name]){
            errors[name] = 'You must provide a value'
        }

    })
    

    return errors
}


export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm)