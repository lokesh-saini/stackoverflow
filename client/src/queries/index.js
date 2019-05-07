import { gql } from 'apollo-boost'

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
