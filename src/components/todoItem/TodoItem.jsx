import React from 'react';

export default class TodoItem extends React.Component {
    constructor() {
        super();

        this.toggleDone = this.toggleDone.bind(this);
    }
    render() {
        const itemStyle = {
            'textDecoration': this.props.item.done ? 'line-through' : ''
        };

        return (
            <li>
                <span style={itemStyle}
                      onClick={this.toggleDone}>
                    {this.props.item.text}
                </span>
            </li>
        );
    }
    toggleDone() {
        this.props.onToggleDone(this.props.item);
    }
}