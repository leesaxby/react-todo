import React from 'react';
import TodoList from './TodoList.jsx';

export default class App extends React.Component {
    render() {
        const todos = [
            {id: 1, name: 'one'},
            {id: 2, name: 'two'},
            {id: 3, name: 'three'}
        ];
      
        return (
            <div>
                <h4>Todo List</h4>
                <TodoList list={todos}/>
            </div>
        )
    }
}