import React from 'react';

export default class TodoForm extends React.Component {
    constructor() {
        super();

        this.input = '';
        this.addTodoItem = this.addTodoItem.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }
    render() {
        return (
            <div>
                <input type="text"
                       value={this.input}
                       onChange={this.updateInput}/>

                <button onClick={this.addTodoItem}>Add</button>
            </div>
        );
    }
    addTodoItem() {
        this.props.onAddTodoItem(this.input);
    }
    updateInput(e) {
        this.input = e.target.value;
    }
}