import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { todos } from '../todos/todos.reducer.js';
import Todos from '../todos/todos.jsx';

const reducer = combineReducers({ todos });
const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default function App() {
    return (
        <Provider store={store}>
            <Todos/>
        </Provider>
    );
}