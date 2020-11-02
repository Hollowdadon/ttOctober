import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Redirect to='/' />
  
  const { id, role: userRole } = jwtDecode(token);

  return (
    <Route {...rest} render={
      props => {
        if (role === userRole) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;
