import React from 'react';
import { connect } from 'react-redux';
import { addTodo, fetchTodos, updateFilter } from './todos.action.js';

import styled from 'styled-components';
import TodoList from './todoList.jsx';
import TodoForm from './todoForm.jsx';
import TodoFilter from './todoFilter.jsx';

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

class Todos extends React.Component {
    constructor() {
        super();

        // this.state = {
        //     todos: {
        //       listItems: [],
        //       filter: 'ACTIVE'
        //     }
        // };

        this.addTodoItem = this.addTodoItem.bind(this);
        this.getTodos = this.getTodos.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.filterTodos = this.filterTodos.bind(this);
    }

    componentWillMount() {
       // this.getTodos();
       this.props.fetchData();
    }

    render() {
        return (
            <div>
                <FlexContainer>
                    <TodoForm onAddTodoItem={this.addTodoItem}/>
                    <TodoFilter filter={this.props.todos.filter}
                                onUpdateFilter={this.updateFilter}/>

                </FlexContainer>

                <FlexContainer>
                    <TodoList listItems={this.filterTodos(this.props.todos.listItems)}
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
        this.props.addTodo({ text: newItem, done: false });
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
        this.props.updateFilter(filter);
    }

    filterTodos(list) {
        return list.filter(({ done }) => this.props.todos.filter === 'DONE' ? done : !done);
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

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchTodos()),
        updateFilter: (filter) => dispatch(updateFilter(filter)),
        addTodo: (todo) => dispatch(addTodo(todo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);