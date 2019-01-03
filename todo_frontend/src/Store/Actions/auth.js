import axios from 'axios';

export const authStart = () => {
    return {
        type: 'AUTH_START'
    }
}

export const authSuccess = (token) => {
    return {
        type: 'AUTH_SUCCESS',
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error: error
    }
}

export const logout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return {
        type: 'AUTH_LOGOUT'
    }
    
}


export const checkAuthTimeOut = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}


export const authLogin = (username, password) => {
    return (dispatch) => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password,
        }).then(response => {
            // If the response is successful, then DRF will return response with a key.
            const token = response.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationDate);
            
            // now we can dispatch the auth success function
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));

        }).catch(error => {
            dispatch(authFail(error.response.data));
        })
    }
}

// Function to handle Registration
export const authRegister = (username, email, password1, password2) => {
    return (dispatch) => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }).then(response => {
            // If the response is successful, then DRF will return response with a key.
            const token = response.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationDate);
            
            // now we can dispatch the auth success function
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));
        }).catch(error => {
            dispatch(authFail(error.response.data));
        })
    }
}

export const authLogout = (history) => {
    return (dispatch) => {
        dispatch(logout());
        history.push('/login')
    }
}

// A function which checks user auth status before loading a component.
export const checkAuthStatus = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {  
            const expirationDate = new Date(localStorage.getItem('expirationTime'))
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeOut( (expirationDate.getTime() - new Date().getTime()) / 1000) );
                 
            }
        }
    }
}


