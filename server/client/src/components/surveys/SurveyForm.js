//survey form shows a form for user to add inpu

import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'


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
                <button type="submit">Submit</button> 
                </form>
            </div>
        )
    }
}
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm)