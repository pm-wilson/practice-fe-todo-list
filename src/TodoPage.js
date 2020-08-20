import React from 'react';
import { fetchTodos, addTodo, updateTodo } from './todo-api.js';

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

  handleNewTodo = async(e) => {
    e.preventDefault();

    await addTodo({todo: this.state.newItem, completed: false});

    const data = await fetchTodos();

    this.setState({newItem: '', newCompleted: false, todos: data.body});
  }

  handleClick = async (id, i) => {
    const info = {todo: this.state.todos[i].todo, completed: true};

    await updateTodo(id, info);

    const data = await fetchTodos();

    this.setState({todos: data.body});
  }

  getClassName = (task) => {
    if (task.completed) return 'complete';
    if (!task.completed) return 'incomplete';
  }

  render() {
    console.log('render', this.state)
    return (
      <div>
        <h2>List of things to do</h2>
        <form onSubmit={this.handleNewTodo}>
          <label>To Do
            <input onChange={e => this.setState({ newItem: e.target.value})} value={this.state.newItem}/>
          </label>
          <button>Add Item</button>
        </form>
        <ul>
          {
            this.state.todos.map((task, i) => <li onClick={() => this.handleClick(task.id, i)} className={this.getClassName(task)} key={'list-item' + i}>{task.todo}{task.completed && ' is complete'}</li>)
          }
        </ul>
      </div>
    );
  }
}