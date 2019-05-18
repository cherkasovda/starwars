import React from 'react';
import './todo-list';

import TodoListItem from '../todo-list-item/todo-list-item'

const TodoList = ({ todos, onDeleted, onLabelClick, onButImpClick }) => {
    const elements = todos.map(item => {
        const { id, ...itemProps } = item;
        return (
            <li key={id} className='list-group-item'>
                <TodoListItem {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    onLabelClick={() => onLabelClick(id)}
                    onButImpClick={() => onButImpClick(id)} />

            </li>
        );
    });
    return (
        <ul className='list-group todo-list'>
            {elements}
        </ul>
    );
};

export default TodoList;