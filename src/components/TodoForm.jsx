import React from 'react';

export default class TodoForm extends React.Component {
    constructor() {
        super()
        this.state = {
            showDone: true
        };
    }
    _toggleDone() {
        this.setState({
            showDone: !this.state.showDone
        });
    }
    render() {
        let toggleText = this.state.showDone ? 'Done' : 'Todo';
        return (
            <div>
                <input type="text"/>
            <button onClick={this._toggleDone.bind(this)}>{toggleText}</button>
            </div>
        )
    }
} 