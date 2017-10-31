import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/app/app.jsx';
import { todos } from './components/todos/todos.reducers.js';

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
    module.hot.accept('./components/app/app.jsx', () => { render(App); });
}
