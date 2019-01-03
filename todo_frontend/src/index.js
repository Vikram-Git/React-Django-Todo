import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Store/Reducers/root';
import thunk from 'redux-thunk';


const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const persistedState = localStorage.getItem('reduxState') 
                        ? JSON.parse(localStorage.getItem('reduxState')) 
                        : {}

const store = createStore(rootReducer, persistedState, storeEnhancer(
    applyMiddleware(thunk)
));

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
    

const app = (
    <Provider store={ store }>
        <App />
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
