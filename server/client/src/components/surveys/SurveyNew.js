//survey new shows a survey form and survey review

import React, { Component } from 'react'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'
//lesson 170 import reduxForm helper
import { reduxForm } from 'redux-form'

class SurveyNew extends Component {
    //create react app has a babel function that 
    //lets us define state without calling the constructur and super props, so:
    state = { showFormReview: false }


    //helper method:
    renderContent(){
        if(this.state.showFormReview){
            return <SurveyFormReview 
            //pass a callback to return from the review page
            onCancel={()=> this.setState({ showFormReview: false })}
            />
        }
        return <SurveyForm 
        // add a callback function responsible for flipping
        // the boolean condition of our state which forces the user
        // to the surveyformreview page:
        onSurveySubmit = {() => this.setState({ showFormReview: true})}
        />
    }
    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}
export default reduxForm({
    form: 'surveyForm'
}) (SurveyNew)