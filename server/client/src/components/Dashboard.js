import React from 'react'
import { Link } from 'react-router-dom'
import SurveyList from './surveys/SurveyList'



const Dashboard = () => {
    return (
        <div>
            hi from dashboad.js
            <SurveyList />
            <div className ="fixed-action-btn">
                {/* anchor tags not allowed in components
                so import in and use Link from reac-router-dom */}
            <Link to="/surveys/new" className="btn-floating btn-large red">
                <i className="material-icons">add</i>
            </Link>
            </div>
        </div>
    )
}

export default Dashboard