import React from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { SIGNUP_USER } from '../../queries'
import Error from '../Error'

const initialState = {
    email: "",
    username: "",
    name: "",
    password: ""
}

class Signup extends React.Component {
    state = { ...initialState }

    clearState = () => {
        this.setState({ ...initialState })
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = (event, signUp) => {
        event.preventDefault()
        signUp().then(async ({data}) => {
            console.log(data)
            await this.props.refetch()
            this.clearState()
            this.props.history.push('/signin')
        })
    }

    validateForm = () => {
        const { email, username, name, password } = this.state
        const isInvalid = !email || !username || !name || !password
        return isInvalid
    }

    render() {
        const { email, username, name, password } = this.state
        return (
            <div className="App ui container">
            <div className="ui attached message">
                <div className="header">
                Welcome to StackOverflow!
                </div>
                <p>Fill out the form below to sign-up for a new account</p>
            </div>
            <Mutation mutation={SIGNUP_USER} variables={{ email, username, name, password }}>
            {(signUp, { data, loading, error }) => {
                return (
                    <form className="ui form attached fluid segment" onSubmit={event => this.handleSubmit(event, signUp)}>
                        <div className="eight wide field">
                            <label>Email</label>
                            <input type="text" name="email" value={email} placeholder="Email" onChange={this.handleChange} />
                        </div>
                        <div className="eight wide field">
                            <label>Username</label>
                            <input type="text" name="username" value={username} placeholder="Username" onChange={this.handleChange} />
                        </div>
                        <div className="eight wide field">
                            <label>Name</label>
                            <input type="text" name="name" value={name} placeholder="Name" onChange={this.handleChange} />
                        </div>
                        <div className="eight wide field">
                            <label>Password</label>
                            <input type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} />
                        </div>
                        <button className="ui button" type="submit" disabled={loading || this.validateForm()}>Submit</button>
                        {error && <Error error={error} />}
                    </form>
                )
            }}
            </Mutation>
            <div className="ui bottom attached warning message">
                <i className="icon help"></i>
                Already signed up? <a href="/signin">Login here</a> instead.
            </div>
            </div>
        )
    }
}

export default withRouter(Signup)
