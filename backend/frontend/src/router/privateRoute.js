import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function App({ component: Component, ...rest }) {

    var isAuthenticated = useState(false)
    if (localStorage.getItem('token')) {
        isAuthenticated = true
    } else {
        isAuthenticated = false
    }
    return <Route {...rest} render={props => (
            isAuthenticated ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
}
