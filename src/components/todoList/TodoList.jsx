import React from 'react';
import TodoItem from '../todoItem/TodoItem.jsx';

export default class TodoList extends React.Component {
    render() {
        return (
            <ul>
                <TodoItem/>
            </ul>
        )
    }
}