import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom";
import TodoPage from './TodoPage.js';
import SignIn from './SignIn.js'
import SignUp from './SignUp.js'
import PrivateRoute from './PrivateRoute.js';
import HomePage from './HomePage.js';

export default class App extends Component {
  state = { token: localStorage.getItem('TOKEN') }

  handleTokenChange = (myToken) => {
    this.setState({ token: myToken });
    localStorage.setItem('TOKEN', myToken);
  }

  render() {
    return (
      <div>
        <Router>
            <ul>
                { this.state.token && <div>welcome, user!!!</div> }
                { this.state.token && <Link to="/todos"><div>todos</div></Link> }
                <Link to="/signup"><div>sign up</div></Link>
                <Link to="/signin"><div>sign in</div></Link>
                <button onClick={() => this.handleTokenChange('')}>logout</button>
            </ul>
          <Switch>
            <Route 
                path="/" 
                exact
                render={(routerProps) => <HomePage {...routerProps} />} 
            />
            <Route exact path='/signin' render={(routerProps) => <SignIn 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps} />} 
              />
            <Route 
            exact path='/signup' 
              render={(routerProps) => <SignUp 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps}/>} 
              />
            <PrivateRoute 
              exact 
              path='/todos' 
              token={this.state.token} 
              render={(routerProps) => <TodoPage 
              {...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}