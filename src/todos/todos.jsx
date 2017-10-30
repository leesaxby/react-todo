import React from 'react';
import { connect } from 'react-redux';
import { addTodo, fetchTodos, updateFilter, updateDoneStatus } from './todos.action.js';

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

        this.addTodoItem = this.addTodoItem.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.filterTodos = this.filterTodos.bind(this);
        this.getTodos = this.getTodos.bind(this);
    }

    componentWillMount() {
        this.getTodos();
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

    addTodoItem(newItem) {
        this.props.addTodo({ text: newItem, done: false });
    }

    toggleDone({ _id, done }) {
        this.props.updateDoneStatus(_id, done);
    }

    updateFilter(filter) {
        this.props.updateFilter(filter);
    }

    filterTodos(list) {
        return list.filter(({ done }) => this.props.todos.filter === 'DONE' ? done : !done);
    }

    getTodos() {
        this.props.fetchData()
            .then(() => {
                this.todoPoll = setTimeout(this.getTodos, 5000);
            })
            .catch(err => {
                this.todoPoll = setTimeout(this.getTodos, 5000);
                console.log(err);
            });
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
        addTodo: (todo) => dispatch(addTodo(todo)),
        updateDoneStatus: (id, doneStatus) => dispatch(updateDoneStatus(id, doneStatus))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);