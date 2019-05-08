import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import './index.css'
import App from './components/App'
import Signup from './components/Auth/Signup'
import Signin from './components/Auth/Signin'


const client = new ApolloClient({
    uri: "http://localhost:3001/graphql"
})

const Root = () => (
    <Router>
    <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Redirect to="/" />
    </Switch>
    </Router>
)

ReactDOM.render(
    <ApolloProvider client={client}>
    <Root />
    </ApolloProvider>,
    document.getElementById('root'))
