import React, {Component} from 'react';
import './static/TaskForm.css'

import * as taskActions from '../../Store/Actions/task'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class TaskForm extends Component{

    
    state = {
        title : ''
    }

    handleChange = (e) => {
        this.setState(
            {title: e.target.value}
        )
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTask(this.state.title);
        this.setState({
            title: ''
        })
    }

    render(){
        return(
            <div className="add-task">
                <form onSubmit={ this.handleSubmit }>
                    <input type="text" onChange={ this.handleChange } value={ this.state.title } 
                    placeholder="   Add Task!"/>
                </form>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (title) => { dispatch(taskActions.addTask(title)) }
    }
}


export default withRouter(connect(null, mapDispatchToProps)(TaskForm));