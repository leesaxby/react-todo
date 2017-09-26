import React from 'react';
import TodoList from '../todoList/TodoList.jsx';
import TodoForm from '../todoForm/TodoForm.jsx';

export default class Todos extends React.Component {
    constructor() {
        super();

        this.state = {
            listItems: []
        };

        this.addTodoItem = this.addTodoItem.bind(this);
        this.getTodos = this.getTodos.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
    }
    componentWillMount() {
        this.getTodos();
    }
    render() {
        return (
            <div>
                <TodoForm onAddTodoItem={this.addTodoItem}/>
                <TodoList listItems={this.state.listItems}
                          onToggleDone={this.toggleDone}/>
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
        fetch('http://178.62.117.150:3000/todos', {
            method: 'POST',
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
    toggleDone({ _id, text, done }) {
        fetch(`http://178.62.117.150:3000/todos/${_id}`, {
            method: 'PUT',
            body: JSON.stringify({ text: text, done: !done }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(todo => {
            const list = Object.assign(this.state.listItems);
            list.find(({_id}) => _id === todo._id).done = todo.done;

            this.setState({
                listItems: list
            });
        })
        .catch(err => console.log(err));
    }

}