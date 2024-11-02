import Cookie from 'js-cookie';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ProtectedRoute extends Component {
    render() {
        const isAuthenticated = Cookie.get('token');

        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }

        return this.props.children;
    }
}

export default ProtectedRoute;
