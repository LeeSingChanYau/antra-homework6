import './App.css';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: '',
    };
    this.URL = 'http://localhost:3000/todos';
  }

  getTodos = () => {
    return fetch(this.URL).then((data) => data.json());
  };

  handleDelete = (id) => {
    fetch(this.URL + '/' + id, { method: 'DELETE' })
      .then((data) => data.json())
      .then((data) => {
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

  handleSubmit = () => {
    console.log(this.state.newTodo);
    const todoObj = { content: this.state.newTodo };
    fetch(this.URL, {
      method: 'POST',
      body: JSON.stringify(todoObj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          todos: [this.state.newTodo, ...this.state.todos],
          newTodo: '',
        });
      });
  };

  componentDidMount() {
    this.getTodos().then((data) => {
      data.reverse();
      this.setState({
        todos: data,
      });
    });
  }

  render() {
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
            {this.state.todos &&
              this.state.todos.map((item) => {
                return (
                  <li key={item.id}>
                    <span>{item.content}</span>
                    <button
                      className="delete-btn"
                      onClick={() => this.handleDelete(item.id)}
                    >
                      remove
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
