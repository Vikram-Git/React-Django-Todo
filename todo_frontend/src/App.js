import React, { Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Components/Navbar'
import * as actions from './Store/Actions/auth'
import LoginForm from './Components/Authentication/LoginForm'
import RegistrationForm from './Components/Authentication/RegistrationForm'
import task from './Components/Todo/Task'

import { connect } from 'react-redux'

class App extends Component {

  componentDidMount() {
    this.props.getAuthStatus();
  }

  render() {
    
    const PrivateRoute = ({component:Component, ...rest}) => (
      <Route {...rest} render={props => (
        this.props.isAuthenticated === true
          ? <Component {...props} />  
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
      )} />
    )

    return (
    <BrowserRouter>
      <div className="App">
        <Navbar {...this.props} />
        <Switch>
          <Route path="/login" component={ LoginForm } />
          <Route path="/register" component={ RegistrationForm } />
          <PrivateRoute exact path="/" component={ task } />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthStatus: () => { dispatch(actions.checkAuthStatus()) },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);