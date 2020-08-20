import React from 'react';
import { fetchTodos, addTodo } from './todo-api.js';

export default class TodoPage extends React.Component {
  state = {
    newItem: '',
    newCompleted: false,
    todos: [],
  }

  componentDidMount = async () => {
    const data = await fetchTodos();

    this.setState({todos: data.body});
  }

  handleNewTodo = async() => {
    const newTodo = {todo: this.state.newItem, completed: this.state.newCompleted};

    await addTodo(newTodo);
    this.setState({newItem: '', newCompleted: false});
  }

  render() {
    return (
      <div>
        <h2>List of things to do</h2>
        <form onSubmit={this.handleNewTodo}>
          <label>Completed
            <input type='checkbox' onChange={e => this.setState({ newCompleted: e.target.checked})} checked={this.state.newCompleted}/>
          </label>
          <label>To Do
            <input onChange={e => this.setState({ newItem: e.target.value})} value={this.state.newItem}/>
          </label>
          <button>Add Item</button>
        </form>

      </div>
    );
  }
}