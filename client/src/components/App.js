import React from 'react'
import './App.css'

import { Query } from 'react-apollo'
import { getProfile } from '../queries'

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={getProfile}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>
        if (error) return <div>Error</div>
        console.log('Data', data)
        return (
          <p>Profile</p>
        )
      }}
    </Query>
  </div>
)


export default App
