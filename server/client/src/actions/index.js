import axios from 'axios'
import { FETCH_USER } from './types'


export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data })
    }


    //lesson 172 - there is some strange incongruity between my action creators and the instructor's action creators - not sure how this is happening
export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values)
    history.push('/surveys')
    dispatch({ type: FETCH_USER, payload: res.data })

}
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token)
    dispatch({ type: FETCH_USER, payload: res.data })
   
}