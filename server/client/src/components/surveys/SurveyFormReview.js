//functional component
//survey form revies shows users their form inputs for review

import React from 'react'
//lesson 166 import connect helper:
import { connect } from 'react-redux'
//lesson 168 import formFields array:
import formFields from './formFields'
import _ from 'lodash'

// lesson 169, import actions creator - note that my file structure is way way different
import * as actions from '../../actions'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
    //map formFields array with lodash and return some jsx
    const reviewFields = _.map(formFields, ({ name, label}) =>{
        return(
            <div key={name}>
                <label>{label}</label>
            
            <div>
                {formValues[name]}
            </div>
            </div>
        )
    })
    
    return(
        <div>
            <h5>Please confirm information</h5>
        
                {reviewFields}
        
        
        <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
        >
            Back
        </button>

        <button 
        //this onClick is fomatted different than the instructor's, I followed my vsc pompts and ended up with the actions. portion that the instructor does not have
        onClick={()=>actions.submitSurvey(formValues)}
        className="green btn-flat right white-text">
        Send Survey
        <i className="material-icons right">email</i>
        </button>
        
        </div>
    )
}

// lesson 166 define convention named mapStateToProps for our connect
function mapStateToProps(state){
    // how do we get access to reduxForm state?
    // console out the state, to look at your redux reducers provides
    // console.log(state)
    return{ formValues: state.form.surveyForm.values }

    }

export default connect(mapStateToProps, actions)(SurveyFormReview)