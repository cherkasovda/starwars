import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
  constructor() {
    super();
    this.state = { done: false, important: false, active: false };

  }

  // onLabelClick() {
  //     console.log(`Done: ${this.props.label}`);
  // }
  render() {
    const { label, onDeleted, onButImpClick, onLabelClick, done, important } = this.props;
    // console.log(`done:`, done);
    let classNames = 'todo-list-item';
    classNames += done ? ' done' : '';
    // classNames += active ? ' active ' : ' done';
    classNames += important ? ' important' : '';



    return (
      <span className={classNames}>
        <span
          className="todo-list-item-label"
          // onClick={()=>console.log(`Done: ${label}`)}
          onClick={onLabelClick}
        >
          {label}
        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onButImpClick}>
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    )

  }
}
/*
const TodoListItem = ({ label, important = false }) =>
{
    const style = {
        color: important ? 'red' : 'black'
    };
    return <span className="todo-list-item">
      <span
          className="todo-list-item-label"
          style={style}>
        {label}
      </span>

      <button type="button"
              className="btn btn-outline-success btn-sm float-right">
        <i className="fa fa-exclamation" />
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right">
        <i className="fa fa-trash-o" />
      </button>
    </span>

};

*/

// export default TodoListItem;
