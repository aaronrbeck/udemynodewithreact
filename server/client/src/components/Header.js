import React, { Component } from 'react'
//hook up header to redux-store
import { connect } from 'react-redux'

class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return 'still deciding'
            case false:
                return 'im loggedout'
            default:
                return 'im loggedin'
        }
    }

    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                <a className="left brand-logo">
                Emaily
                </a>
                <ul className="right">

                {this.renderContent()}



                </ul>
                </div>
            </nav>
        )
    }
}
    function mapStateToProps({ auth }){
        return { auth }
    
}
export default connect(mapStateToProps)(Header)