import React from 'react'

const Error = ({ error }) => (
    <div className="ui negative message">
        <div className="header">
        {error.message}
        </div>
    </div>
)

export default Error
