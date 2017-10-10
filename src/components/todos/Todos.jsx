import React from 'react';
import styled from 'styled-components';
import TodoList from '../todoList/TodoList.jsx';
import TodoForm from '../todoForm/TodoForm.jsx';

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

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
                <FlexContainer>
                    <TodoForm onAddTodoItem={this.addTodoItem}/>
                </FlexContainer>

                <FlexContainer>
                    <TodoList listItems={this.state.listItems}
                              onToggleDone={this.toggleDone}/>
                </FlexContainer>
            </div>
        );
    }

    componentWillUnmount() {
        clearTimeout(this.todoPoll);
    }

    getTodos() {
        this.todoService({ type: 'GET' })
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
        this.todoService({ type: 'POST', data: { text: newItem, done: false } })
        .then(todo => {
            this.setState({
                listItems: [ ...this.state.listItems, todo ]
            });
        })
        .catch(err => console.log(err));
    }

    toggleDone({ _id, text, done }) {
        this.todoService({ type: 'PUT', id: _id, data: { text: text, done: !done } })
            .then(todo => {
                const list = Object.assign(this.state.listItems);
                list.find(({_id}) => _id === todo._id).done = todo.done;

                this.setState({
                    listItems: list
                });
            })
            .catch(err => console.log(err));
    }

    todoService({ type, id = '', data }) {
        return fetch(`http://178.62.117.150:3000/todos/${id}`, {
            method: type,
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json());
    }
}