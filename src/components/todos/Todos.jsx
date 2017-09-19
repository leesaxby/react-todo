import React from 'react';
import TodoList from '../todoList/TodoList.jsx';

export default class Todos extends React.Component {
    constructor() {
        super()

        this.state = {
            listItems: [
                { id: 1, text: 'Item one' },
                { id: 2, text: 'Item two' },
                { id: 3, text: 'Item three' },
                { id: 4, text: 'Item four' },
            ]
        }
    }
    render() {
        return (
            <TodoList listItems={this.state.listItems}/>
        );
    }
}