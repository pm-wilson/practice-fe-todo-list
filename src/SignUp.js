import React from 'react';
import { signUp } from './todo-api.js';

export default class SignUp extends React.Component {
    state = {
        signUpEmail: '',
        signUpPassword: '',
    }

    handleCreate = async (e) => {
        e.preventDefault();

        const user = await signUp({
            email: this.state.signUpEmail,
            password: this.state.signUpPassword
        })

        this.props.handleTokenChange(user.body.token);
        this.props.history.push('/todos')
    }

    render() {
        return (
          <div>
            <h1>Enter the information below to create an account</h1>
            <form className='login-form' onSubmit={this.handleCreate}>
                <label>Email:
                    <input onChange={e => this.setState({ signUpEmail: e.target.value})} type='email' value={this.state.signUpEmail}/>
                </label>
                <label>Password:
                    <input onChange={e => this.setState({ signUpPassword: e.target.value})} type='password' value={this.state.signUpPassword}/>
                </label>
                <button>Create Account</button>
            </form>
          </div>
        );
    }
}