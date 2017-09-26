import React from 'react';

export default class TodoForm extends React.Component {
    constructor() {
        super();

        this.state = {
            newItem: ''
        };
        this.addTodoItem = this.addTodoItem.bind(this);
        this.updateNewItem = this.updateNewItem.bind(this);
    }
    render() {
        return (
            <div>
                <input type="text"
                       value={this.state.newItem}
                       onChange={this.updateNewItem}/>

                <button onClick={this.addTodoItem}>Add</button>
            </div>
        );
    }
    addTodoItem() {
        this.props.onAddTodoItem(this.state.newItem);
    }
    updateNewItem(e) {
        this.setState({ newItem: e.target.value });
    }
}