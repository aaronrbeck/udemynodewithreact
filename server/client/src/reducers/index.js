import { combineReducers } from 'redux'
//import redux reducer:
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import surveysReducer from './surveysReducer'

export default combineReducers({
    //add reducer as k:v pair, reducer's output will be stored to its key
    //in state object maintained by redux
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
})