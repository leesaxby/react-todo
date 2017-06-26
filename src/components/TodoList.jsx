import React from 'react';
import TodoItem from './TodoItem.jsx';

export default class TodoList extends React.Component {
    _getTodos() {
        return this.props.list.map(item => <TodoItem key={item.id} item={item}/>)
    }
    render() {
        return (
            <ul>
                {this._getTodos()}
            </ul>
        )  
    }
}