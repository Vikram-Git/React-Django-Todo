import React, { Component } from 'react';
import TaskForm from './TaskForm'
import DisplayTask from './DisplayTask'

import { withRouter } from 'react-router-dom'

class Task extends Component {

    
    render() {
        return (
            
            <div className="container">
                <div className="container">
                    <TaskForm />
                    <DisplayTask />
                </div>
            </div>
        );
    }
}

export default withRouter(Task);
 