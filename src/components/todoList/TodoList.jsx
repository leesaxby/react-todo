import React from 'react';
import styled from 'styled-components';
import TodoItem from '../todoItem/TodoItem.jsx';

const List = styled.ul`
    list-style: none;
    min-width: 200px;
    padding: 0;
    margin: 10px 0;
`;

export default function TodoList(props) {
    const getListItems = () => {
        return props.listItems
            .map(item => <TodoItem key={item._id}
                                   item={item}
                                   onToggleDone={props.onToggleDone} />
            );
    };

    return (
        <List>{ getListItems() }</List>
    );
}