import React, { Component } from "react";
import './static/LoginForm.css'
import { Link, Redirect } from 'react-router-dom'
import * as actions from '../../Store/Actions/auth';
import { connect } from 'react-redux'


class LoginForm extends Component {

    state = {
        username: null,
        password: null,
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.runAuth(this.state.username, this.state.password);
    }

    render() {
        let error = null
        let errorMsg = null
        
        if (this.props.error){
            errorMsg = this.props.error.non_field_errors
        }                

        if (errorMsg) {
            error = (
                <p className="center red-text">{ errorMsg }</p>
            )
        }

        const { from } = this.props.location.state || { from: { pathname: '/' } }  
        
        return (
            this.props.isAuthenticated 
            ?
            <Redirect to={ from }/>
            :
            <div className="container">
                <div className="login-form">
                    <div className="row">
                        <div className="col m8 offset-m2">
                            <h4 className="center header">Login</h4>
                            { error }
                            <form onSubmit={ this.handleSubmit }>
                                <div className="row">
                                <div className="input-field">
                                    <input placeholder="Username" id="username" type="text" className="validate" 
                                    onChange={ this.handleChange } />
                                </div>
                                </div>
                                
                                <div className="row">
                                <div className="input-field">
                                    <input placeholder="Password" id="password" type="password" className="validate" 
                                    onChange={ this.handleChange } />
                                </div>
                                </div>
                            
                                <div className="row">
                                <button className="btn">Log In</button>  or <Link to="/register">Register!</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error,
        isAuthenticated: state.token !== null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        runAuth: (username, password) => {
            dispatch(actions.authLogin(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
