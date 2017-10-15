import React from 'react';
import styled from 'styled-components';
import TodoList from '../todoList/TodoList.jsx';
import TodoForm from '../todoForm/TodoForm.jsx';
import TodoFilter from '../todoFilter/TodoFilter.jsx';

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

export default class Todos extends React.Component {
    constructor() {
        super();

        this.state = {
            todos: {
              listItems: [],
              filter: 'ACTIVE'
            }
        };

        this.addTodoItem = this.addTodoItem.bind(this);
        this.getTodos = this.getTodos.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.filterTodos = this.filterTodos.bind(this);
    }

    componentWillMount() {
        this.getTodos();
    }

    render() {
        return (
            <div>
                <FlexContainer>
                    <TodoForm onAddTodoItem={this.addTodoItem}/>
                    <TodoFilter filter={this.state.todos.filter}
                                onUpdateFilter={this.updateFilter}/>

                </FlexContainer>

                <FlexContainer>
                    <TodoList listItems={this.filterTodos(this.state.todos.listItems)}
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
                    todos: {
                        listItems: todos,
                        filter: this.state.todos.filter
                    }
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
                todos: {
                  listItems: [ ...this.state.todos.listItems, todo ],
                  filter: this.state.todos.filter
                }
            });
        })
        .catch(err => console.log(err));
    }

    toggleDone({ _id, text, done }) {
        this.todoService({ type: 'PUT', id: _id, data: { text: text, done: !done } })
            .then(todo => {
                const list = Object.assign(this.state.todos.listItems);
                list.find(({_id}) => _id === todo._id).done = todo.done;

                this.setState({
                    todos: {
                        listItems: list,
                        filter: this.state.todos.filter
                    }
                });
            })
            .catch(err => console.log(err));
    }

    updateFilter(filter) {
        this.setState({
            todos: {
                listItems: this.state.todos.listItems,
                filter: filter
            }
        });
    }

    filterTodos(list) {
        return list.filter(({ done }) => this.state.todos.filter === 'DONE' ? done : !done);
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