import React from 'react';
import TodoItem from './TodoItem.jsx';

export default class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.list.map(item => <TodoItem key={item.id} item={item}/>)}
            </ul>
        )  
    }
}