import { gql } from 'apollo-boost'

// Queries

export const GET_PROFILE = gql`
    query {
        me {
            id
            email
            name
            username
            createdAt
        }
    }
`

// Mutation
export const SIGNUP_USER = gql`
    mutation($email: String!, $username: String!, $name: String!, $password: String!) {
        signUp(email: $email, username: $username, name: $name, password: $password) {
            id
        }
    }
`

export const SIGNIN_USER = gql`
    mutation($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            id
            name
            username
            email
            token
        }
    }
`
