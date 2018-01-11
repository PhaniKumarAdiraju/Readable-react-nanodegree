import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

import './index.css';
import App from './components/App';
import reducer from '../src/reducers/index'
import registerServiceWorker from './registerServiceWorker';

const logger = store => next => action => {
    let output = next(action)
    return output
}

const composers = compose || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(
    reducer,
    composers(
        applyMiddleware(logger, thunk)
    )
)

const history = createHistory()

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
