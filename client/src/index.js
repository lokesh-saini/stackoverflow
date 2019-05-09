import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import './index.css'
import App from './components/App'
import Signup from './components/Auth/Signup'
import Signin from './components/Auth/Signin'
import withSession from './components/withSession'
import Navbar from './components/Navbar'


const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
            operation.setContext({
                headers: {
                    authorization: user.token
                }
            })
        }
    },
    onError: ({networkError}) => {
        if(networkError) {
            console.log('Network Error', networkError)
            if(networkError.statusCode === 401) {
                localStorage.removeItem('user')
            }
        }
    }
})

const Root = ({ refetch }) => (
    <Router>
    <Fragment>
        <Navbar />
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/signin" render = {() => <Signin refetch={refetch} />} />
            <Route path="/signup" render = {() => <Signup refetch={refetch} />} />
            <Redirect to="/" />
        </Switch>
    </Fragment>
    </Router>
)

const RootWithSession = withSession(Root)

ReactDOM.render(
    <ApolloProvider client={client}>
    <RootWithSession />
    </ApolloProvider>,
    document.getElementById('root'))
