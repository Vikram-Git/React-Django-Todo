import React, { Component } from 'react'
import './static/DisplayTask.css'
import { TaskFilter } from './taskUtils'

import * as taskActions from '../../Store/Actions/task'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class DisplayTask extends Component {
    
    state = {
        filter: null
    }

    componentDidMount(){
        this.props.loadTask();
    }

    handleFilter = (filter) => {
        this.setState({
            filter: filter
        })
    }

    taskFilter = (tasks, filter) => {
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.completed === true)
    
            case 'active':
                return tasks.filter(task => task.completed === false)
    
            default:
                return tasks;
        }
    }

    render() {

        const filteredTask = this.taskFilter(this.props.tasks, this.state.filter)

        const taskList = filteredTask.length ? (
            filteredTask.map(task => {
                return(
                    <div className="task" key={ task.id }>
                        <div className="row">
                            <div className="col s10">
                                { task.title }
                            </div>
                            <div className="col s1 center">
                                <i className={"material-icons completed " + ((task.completed) ? "green-text" : "")}
                                onClick={() => { this.props.completeTask(task.id, task.completed)}}>done</i>
                            </div>
                            <div className="col s1 center">
                                <i className="material-icons remove" onClick={() => {this.props.removeTask(task.id)}}>clear</i>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </div>
                    
                )
            })
        ) : (
            <div className="collection-item">
                <p className="center">No Task Left!</p>
            </div>
        )
        
        return (
            <div className="task-container">
                <TaskFilter handleFilter={ this.handleFilter } filter={this.state.filter} />
                <div className="task-list">                
                    { taskList }            
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTask: () => { dispatch(taskActions.getTask()) },
        completeTask: (id, completed) => { dispatch(taskActions.completeTask(id, completed)) },
        removeTask: (id) => { dispatch(taskActions.removeTask(id)) }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayTask));