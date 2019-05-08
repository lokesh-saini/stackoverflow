import React from 'react'

const Error = ({ error }) => (
    <div class="ui negative message">
        <i class="close icon"></i>
        <div class="header">
        Action Forbidden
        </div>
        <p>{error.message}
        </p>
    </div>
)

export default Error
