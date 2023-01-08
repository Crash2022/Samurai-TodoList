import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppWithRedux} from './app/AppWithRedux';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./state/store";
import {BrowserRouter} from "react-router-dom";
import {rootReducer} from './state/reducers';

const rerenderEntireTree = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <AppWithRedux/>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root'));
}

rerenderEntireTree();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// hot reloading-replacement
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/AppWithRedux', () => {
        rerenderEntireTree();
    })
}