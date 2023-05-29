import './App.css';
import React from 'react';
import { getTodos, postTodo, updateTodo, deleteTodo } from './api/Api';
import TodoItem from './components/TodoItem/TodoItem';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: '',
    };
    this.URL = 'http://localhost:3000/todos';
  }

  handleDelete = (id) => {
    deleteTodo(id).then((data) => {
      this.setState({
        todos: this.state.todos.filter((item) => item.id !== +id),
      });
    });
  };

  handleOnChange = (e) => {
    this.setState({
      newTodo: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const todoObj = { content: this.state.newTodo, completed: false };
    postTodo(todoObj).then((data) => {
      this.setState({
        todos: [data, ...this.state.todos],
        newTodo: '',
      });
    });
  };

  handleComplete = (e, todo) => {
    e.preventDefault();
    const todoObj = { ...todo, completed: !todo.completed };
    updateTodo(todoObj).then((res) => {
      this.setState({
        todos: this.state.todos.map((item) => {
          if (item.id === res.id) {
            return { ...res };
          } else {
            return item;
          }
        }),
      });
    });
  };

  handleEdit = (e, todo, input) => {
    e.preventDefault();
    const todoObj = { ...todo, content: input };
    updateTodo(todoObj).then((res) => {
      this.setState({
        todos: this.state.todos.map((item) => {
          if (item.id === res.id) {
            return { ...res };
          } else {
            return item;
          }
        }),
      });
    });
  };

  componentDidMount() {
    getTodos().then((data) => {
      data.reverse();
      this.setState({
        todos: data,
      });
    });
  }

  render() {
    const { todos } = this.state;
    const pendingTodos = todos.filter((todo) => todo.completed === false);
    const completedTodos = todos.filter((todo) => todo.completed === true);
    return (
      <div className="root">
        <form>
          <input
            className="todo-input"
            value={this.state.newTodo}
            onChange={this.handleOnChange}
          />
          <button className="submit-btn" onClick={this.handleSubmit}>
            submit
          </button>
        </form>
        <div className="todolist-container">
          <ul>
            <p>Pending Tasks</p>
            {pendingTodos &&
              pendingTodos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    handleDelete={this.handleDelete}
                    handleComplete={this.handleComplete}
                    handleEdit={this.handleEdit}
                  />
                );
              })}
          </ul>
          <ul>
            <p>Completed Tasks</p>
            {completedTodos &&
              completedTodos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    handleDelete={this.handleDelete}
                    handleComplete={this.handleComplete}
                    handleEdit={this.handleEdit}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
