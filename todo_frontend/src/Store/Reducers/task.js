import { updateObject } from '../utility'

export const getTask = (state, action) => {
    return updateObject(state, {
        tasks: action.tasks,
        loading: false
    });
}

export const addTask = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

export const completeTask = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

export const removeTask = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}


export const taskFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
}