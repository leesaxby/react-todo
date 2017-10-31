import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './app/app.jsx';
import { todos } from './todos/todos.reducer.js';

const reducer = combineReducers({ todos });
const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

const render = Component => {
    ReactDOM.render(
      <AppContainer>
          <Provider store={store}>
            <Component />
          </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./app/app.jsx', () => { render(App); });
}
