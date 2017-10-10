import React from 'react';
import styled from 'styled-components';

const TodoInput = styled.input`
    height: 45px;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 3px;
    box-shadow: 0 2px 3px #aaa;
    outline: 0px;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 100;
    font-style: italic;
`;

export default class TodoForm extends React.Component {
    constructor() {
        super();

        this.state = {
            newItem: ''
        };
        this.addTodoItem = this.addTodoItem.bind(this);
        this.updateNewItem = this.updateNewItem.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    render() {
        return (
            <TodoInput type="text"
                       placeholder="Add Item"
                       value={this.state.newItem}
                       onChange={this.updateNewItem}
                       onKeyPress={this.handleKeyPress}/>
        );
    }
    addTodoItem() {
        this.props.onAddTodoItem(this.state.newItem);
        this.setState({ newItem: '' });
    }
    updateNewItem(e) {
        this.setState({ newItem: e.target.value });
    }
    handleKeyPress(e) {
      if (e.key === 'Enter') {
        this.addTodoItem();
      }
    }
}