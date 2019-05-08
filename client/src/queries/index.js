import { gql } from 'apollo-boost'

// Queries

export const getProfile = gql`
    query {
        users {
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
