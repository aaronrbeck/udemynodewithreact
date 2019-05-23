import axios from 'axios'
import { FETCH_USER } from './types'


export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data })
    }

//added in lesson 169, action creator for our submitSurvey button:
export const submitSurvey = values =>{
    return { type: 'submit_survey'}
}
    //as of 169 the instructor no longer has this hand token action in here
    //why do I have it around then?
    //also he only has index.js in his actions folder while I also have types.js, huh?
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token)
    dispatch({ type: FETCH_USER, payload: res.data })
   
}