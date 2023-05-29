import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component {
  constructor() {
    super();
    this.state = {
      showInput: false,
      inputValue: '',
    };
  }

  onEdit(e, todo, input) {
    const { handleEdit } = this.props;
    if (this.state.showInput === true) {
      handleEdit(e, todo, input);
    }
    this.setState({ showInput: !this.state.showInput });
  }

  render() {
    const { item, handleDelete, handleComplete } = this.props;
    const arrow = item.completed ? '←' : '→';
    return (
      <li key={item.id}>
        {this.state.showInput ? (
          <input
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
          />
        ) : (
          <span className="todo-content">{item.content}</span>
        )}
        <div>
          <button onClick={(e) => this.onEdit(e, item, this.state.inputValue)}>
            edit
          </button>
          <button onClick={() => handleDelete(item.id)}>remove</button>
          <button onClick={(e) => handleComplete(e, item)}> {arrow} </button>
        </div>
      </li>
    );
  }
}

export default TodoItem;
