//functional component
//survey form revies shows users their form inputs for review

import React from 'react'
//lesson 166 import connect helper:
import { connect } from 'react-redux'
//lesson 168 import formFields array:
import formFields from './formFields'
import _ from 'lodash'


const SurveyFormReview = ({ onCancel, formValues }) => {
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
        className="yellow darken-3 btn-flat"
        onClick={onCancel}
        >
            Back
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

export default connect(mapStateToProps)(SurveyFormReview)