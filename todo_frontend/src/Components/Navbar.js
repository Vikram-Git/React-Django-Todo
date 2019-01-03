import React, { Component } from 'react';
import './Navbar.css';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../Store/Actions/auth';
import { connect } from 'react-redux';

class Navbar extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout(this.props.history);    
    } 
    
    render (){
        return(
            <div className="container">
                <div className="nav-bar">
                    <a href="/" className="logo">ToDo App</a>
                    <ul className="right">
                        { 
                            (this.props.isAuthenticated) ?
                            <li onClick={ this.handleLogout }>Logout</li>
                            :
                            <li><Link to="/login">Login</Link></li>
                        }
                        <li><Link to="/#">GitHub</Link></li>
                    </ul>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (history) => { dispatch(actions.authLogout(history)) }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Navbar))