import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import logger from 'redux-logger';
import { observe } from 'redux-observers'
import thunk from 'redux-thunk'

import App from './App'
import * as reducers from './reducers'
import observers from './observers'

const rootReducer = combineReducers(reducers)

const initialState = window._state
const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
window.store = store

observe(store, observers)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
