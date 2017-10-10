import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: left;
    background: #ffffff;
    height: 40px;
    width: 100%;
    padding: 0 10px;
    border: solid #2ecc71 0;
    border-radius: 3px;
    box-shadow: 0 2px 3px #aaa;
    margin-bottom: 10px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    cursor: pointer;
`;

const ItemText = styled.span`
    color: ${props => props.done ? '#7f7f7f' : ''};
    text-decoration: ${props => props.done ? 'line-through' : ''}
`;

const StatusCirle = styled.div`
    display: inline-block;
    height: 15px;
    width: 15px;
    border-radius: 75px;
    margin-right: 10px;
    background-color: ${props => props.done ? '#f39c12' : '#2ecc71'};
`;

export default function TodoItem({ item, onToggleDone }) {
    const toggleDone = () => {
        onToggleDone(item);
    };

    return (
        <ListItem onClick={ toggleDone }>
            <StatusCirle done={ item.done }></StatusCirle>
            <ItemText done={ item.done }>
                { item.text }
            </ItemText>
        </ListItem>
    );
}