import React from 'react'

import { Query } from 'react-apollo'
import { GET_PROFILE } from '../queries'

const withSession = Component => props => (
    <Query query={GET_PROFILE}>
        {({data, loading, refetch}) => {
            if (loading) return null
            console.log(data)
            return (
                <Component {...props} refetch={refetch} />
            )
        }}
    </Query>
)

export default withSession
