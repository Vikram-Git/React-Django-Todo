import axios from 'axios';
import { getUserToken } from '../utility'


export const taskFail = (error) => {
    return {
        type: 'TASK_FAIL',
        error: error
    }
}

export const getTask = () => {
    return (dispatch, getState) => {
        const token = getUserToken(getState())
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/task/',
            headers: { 'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
        }).then(response => {
            const tasks = response.data;
            dispatch({type: 'GET_TASK', tasks: tasks})
        }).catch(error => {
            dispatch(taskFail(error))
        })
    }
}


export const addTask = (title) => {
    return (dispatch, getState) => {
        const token = getUserToken(getState())
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/task/',
            headers: { 'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            data: {title: title}
        }).then(response => {
            dispatch({type: 'ADD_TASK'})
            dispatch(getTask())
        }).catch(error => {
            dispatch(taskFail(error))
        })
    }
}


export const completeTask = (id, completed) => {
    return (dispatch, getState) => {
        const token = getUserToken(getState())
        axios({
            method: 'patch',
            url: `http://127.0.0.1:8000/api/task/${ id }/`,
            headers: { 'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            data: (completed) ? { completed: false } : { completed: true }
        }).then(response => {
            dispatch({type: 'COMPLETE_TASK'})
            dispatch(getTask())
        }).catch(error => {
            dispatch(taskFail(error))
        })
    }
}

export const removeTask = (id) => {
    return (dispatch, getState) => {
        const token = getUserToken(getState())
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/task/${ id }/`,
            headers: { 'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
        }).then(response => {
            dispatch({type: 'REMOVE_TASK'})
            dispatch(getTask())
        }).catch(error => {
            dispatch(taskFail(error))
        })
    }
}