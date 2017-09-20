import React from 'react';
import TodoList from '../todoList/TodoList.jsx';
import TodoForm from '../todoForm/TodoForm.jsx';

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

        this.addTodoItem = this.addTodoItem.bind(this);
    }
    addTodoItem(newItem) {
        const maxId = Math.max(
            ...this.state.listItems.map(({id}) => id)
        );

        this.setState({
            listItems: [ { id: maxId + 1, text: newItem }, ...this.state.listItems ]
        });
    }
    render() {
        return (
            <div>
                <TodoForm onAddTodoItem={this.addTodoItem}/>
                <TodoList listItems={this.state.listItems}/>
            </div>
        );
    }
}