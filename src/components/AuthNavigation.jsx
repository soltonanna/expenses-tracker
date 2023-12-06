import React from 'react';
import { Link } from 'react-router-dom';

const AuthNavigation = () => {
  return (
    <ul className='auth-navigation'>
        <li><Link to="login">Login </Link></li>
        <li><Link to="signup" > Sign Up </Link></li>
        <li><Link to="forgot-password" > Forgot Password? </Link></li>
    </ul>
  )
}

export default AuthNavigation;