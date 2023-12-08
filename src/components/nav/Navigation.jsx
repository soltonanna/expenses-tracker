import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navigation = () => {
    let { user } = useContext(AuthContext);

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

                { user &&     
                    <li>
                        <NavLink 
                            to="/profile"
                            className={ ( isActive ) => { isActive ? 'active' : undefined } }>
                            Profile
                        </NavLink>
                    </li>
                }
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