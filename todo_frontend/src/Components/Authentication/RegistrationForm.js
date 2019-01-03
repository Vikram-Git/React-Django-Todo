import React, { Component } from "react";
import './static/RegistrationForm.css';
import * as actions from '../../Store/Actions/auth';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class RegistrationForm extends Component {

    state = {
        username: null,
        email: null,
        password1: null,
        password2:null
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.runAuth(this.state.username, this.state.email, 
            this.state.password1, this.state.password2,);
    }


    render() {
        let error = null
        let errorMsg = null
        
        if (this.props.error){
            errorMsg = this.props.error.username || this.props.error.email 
            || this.props.error.password1 || this.props.error.non_field_errors
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
                    <h4 className="center header">Registration</h4>
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
                            <input placeholder="Email ID" id="email" type="email" className="validate" 
                            onChange={ this.handleChange } />
                        </div>
                        </div>
                        
                        <div className="row">
                        <div className="input-field">
                            <input placeholder="Password" id="password1" type="password" className="validate" 
                            onChange={ this.handleChange } />
                        </div>
                        </div>

                        <div className="row">
                        <div className="input-field">
                            <input placeholder="Confirm Password" id="password2" type="password" 
                            className="validate" onChange={ this.handleChange } />
                        </div>
                        </div>
                    
                        <div className="row">
                        <button className="btn">Register</button>
                        </div>

                    </form>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        error: state.error,
        isAuthenticated: state.token !== null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        runAuth: (username, email, password1, password2) => {
            dispatch(actions.authRegister(username, email, password1, password2))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)