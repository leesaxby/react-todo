import React from 'react';

export default function TodoItem(props) {

    const itemStyle = {
        'textDecoration': props.item.done ? 'line-through' : ''
    };

    const toggleDone = () => {
        props.onToggleDone(props.item);
    };

    return (
        <li>
            <span style={itemStyle}
                onClick={toggleDone}>
                {props.item.text}
            </span>
        </li>
    );

}