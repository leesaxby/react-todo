import React from 'react';
import TodoList from '../todoList/TodoList.jsx';
import TodoForm from '../todoForm/TodoForm.jsx';

export default class Todos extends React.Component {
    constructor() {
        super()

        this.state = {
            listItems: []
        }

        this.addTodoItem = this.addTodoItem.bind(this);
        this.getTodos = this.getTodos.bind(this);
    }
    componentWillMount() {
        this.getTodos();
    }
    render() {
        return (
            <div>
                <TodoForm onAddTodoItem={this.addTodoItem}/>
                <TodoList listItems={this.state.listItems}/>
            </div>
        );
    }
    componentWillUnmount() {
        clearTimeout(this.todoPoll);
    }
    getTodos() {
        fetch('http://178.62.117.150:3000/todos', { method: 'get' })
            .then(res => res.json())
            .then(todos => {
                this.setState({
                    listItems: todos
                });

                this.todoPoll = setTimeout(this.getTodos, 5000);
            })
            .catch(err => {
                this.todoPoll = setTimeout(this.getTodos, 5000);
                console.log(err);
            });
    }
    addTodoItem(newItem) {
        fetch("http://178.62.117.150:3000/todos", {
            method: "POST",
            body: JSON.stringify({ text: newItem, done: false }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(todo => {
            this.setState({
                listItems: [ ...this.state.listItems, todo ]
            });
        })
        .catch(err => console.log(err));

    }

}