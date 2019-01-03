import * as authReducers from './auth';
import * as taskReducers from './task';

const initialState = {
    tasks: [],
    token: null,
    error: null,
    loading: false
}


// Our Reducer Function
const rootReducer = (state=initialState, action) => {
    switch (action.type){
        case 'AUTH_START': return authReducers.authStart(state, action);
        case 'AUTH_SUCCESS': return authReducers.authSuccess(state, action);
        case 'AUTH_FAIL': return authReducers.authFail(state, action);
        case 'AUTH_LOGOUT': return authReducers.authLogout(state, action);
        case 'GET_TASK': return taskReducers.getTask(state, action);
        case 'ADD_TASK': return taskReducers.addTask(state, action);
        case 'COMPLETE_TASK': return taskReducers.completeTask(state, action);
        case 'REMOVE_TASK': return taskReducers.removeTask(state, action);
        default:
            return state;
    }
}

export default rootReducer
