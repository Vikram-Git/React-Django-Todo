
export const updateObject = (oldObjects, UpdatedObjects) => {
    return {
        ...oldObjects,
        ...UpdatedObjects
    }
}

export const getUserToken = (state) => {
    return state.token;
}

 