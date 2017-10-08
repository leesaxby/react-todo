import React from 'react';
import TodoItem from '../todoItem/TodoItem.jsx';

export default function TodoList(props) {

    const getListItems = () => {
        return props.listItems
            .map(item => <TodoItem key={item._id}
                                   item={item}
                                   onToggleDone={props.onToggleDone} />
            );
    }

    return (
        <ul>{ getListItems() }</ul>
    );

}