import React from 'react';
import TodoList from './TodoList.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h4>Todo List</h4>
                <TodoList/>
            </div>
        )
    }
}