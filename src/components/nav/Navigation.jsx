import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navigation = () => {
    let { user, logOutUser } = useContext(AuthContext);

    const logoutHandler = (e) => {
        e.preventDefault();
        logOutUser(user.email);
    }

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

                { user &&  ( <>
                    <li>
                        <NavLink 
                            to="/profile"
                            className={ ( isActive ) => { isActive ? 'active' : undefined } }>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/wallet"
                            className={ ( isActive ) => { isActive ? 'active' : undefined } }>
                            My Wallet
                        </NavLink>
                    </li>
                    </>)      
                }
                { user ? (
                    <li onClick ={ logoutHandler }> <span>Logout</span></li>
                ) : (
                    <li>
                        <NavLink 
                            to="/login"
                            className={ ( isActive ) => { isActive ? 'active' : undefined } }>
                            Login
                        </NavLink>
                    </li>
                )
                }
            </ul>
            
        </nav>
        
    )
}

export default Navigation;