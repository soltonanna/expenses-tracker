import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
        <ul>
            <li>
                <NavLink 
                    to="/"
                    className={ ( isActive ) => { isActive ? 'active' : undefined } }>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink 
                    to="/profile"
                    className={ ( isActive ) => { isActive ? 'active' : undefined } }>
                    Profile
                </NavLink>
            </li>

            <li>
                <NavLink 
                    to="/login"
                    className={ ( isActive ) => { isActive ? 'active' : undefined } }>
                    Login
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navigation;