import React from 'react';
import { signIn } from './todo-api.js';

export default class SignIn extends React.Component {
    state = {
        signInEmail: '',
        signInPassword: '',
    }

    handleCreate = async (e) => {
        e.preventDefault();

        const user = await signIn({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })
        
        this.props.handleTokenChange(user.body.token);
        this.props.history.push('/todos')
    }

    render() {
        return (
          <div>
            <h1>Enter the information below to create an account</h1>
            <form onSubmit={this.handleCreate}>
                <label>Email:
                    <input onChange={e => this.setState({ signInEmail: e.target.value})} type='email' value={this.state.signInEmail}/>
                </label>
                <label>Password:
                    <input onChange={e => this.setState({ signInPassword: e.target.value})} type='password' value={this.state.signInPassword}/>
                </label>
                <button>Sign In</button>
            </form>
          </div>
        );
    }
}