import React from 'react';
import TodoItem from '../todoItem/TodoItem.jsx';

export default class TodoList extends React.Component {
    constructor() {
        super()

        this.getListItems = this.getListItems.bind(this);
    }
    render() {
        return (
            <ul>
                {this.getListItems()}
            </ul>
        )
    }
    getListItems() {
        return this.props.listItems
                .map(item => <TodoItem key={item.id} text={item.text}/>);
    }
}