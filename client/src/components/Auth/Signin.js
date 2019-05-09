import React from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { SIGNIN_USER } from '../../queries'
import Error from '../Error'

const initialState = {
    email: "",
    password: ""
}

class Signin extends React.Component {
    state = { ...initialState }

    clearState = () => {
        this.setState({ ...initialState })
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = (event, signIn) => {
        event.preventDefault()
        signIn().then(async ({data}) => {
            console.log(data)
            localStorage.setItem('user', JSON.stringify(data.signIn))
            await this.props.refetch()
            this.clearState()
            this.props.history.push('/')
        })
    }

    validateForm = () => {
        const { email, password } = this.state
        const isInvalid = !email || !password
        return isInvalid
    }

    render() {
        const { email, password } = this.state
        return (
            <div className="App ui container">
            <div className="ui attached message">
                <div className="header">
                Welcome to StackOverflow!
                </div>
            </div>
            <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>
            {(signIn, { data, loading, error }) => {
                return (
                    <form className="ui form attached fluid segment" onSubmit={event => this.handleSubmit(event, signIn)}>
                        <div className="eight wide field">
                            <label>Email</label>
                            <input type="text" name="email" value={email} placeholder="Email" onChange={this.handleChange} />
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
                Not signed up? <a href="/signup">Signup here</a> instead.
            </div>
            </div>
        )
    }
}

export default withRouter(Signin)
