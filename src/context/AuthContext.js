import React, { createContext, useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import AuthService from '../services/auth.service';
import UsersService from "../services/users.service";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState(null);
    const [userLogout, setUserLogout] = useState(false);
    const [authTokens, setAuthTokens] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Check if there are tokens in local storage when the component mounts
        const tokens = JSON.parse(localStorage.getItem("authTokens"));
        if (tokens) {
          setAuthTokens(tokens);
          const decodedUser = jwtDecode(tokens.accessToken);
          setUser(decodedUser);
        }
    }, []);

    useEffect( ()=> {
      if( userLogout ) {
        logOutCurrentUser();
      }
    }, []);

    const signInCurrentUser = async (credentials) => {
      try {
        const result = await UsersService.signup(credentials);
        console.log("Signup result:", result);

        // Use 'success' for show some data
        setSuccess(true);

      } catch (error) {
        console.error("Error during sign up:", error.message);
      }
    }

    const loginCurrentUser = async (credentials) => {
        try {
          // Call the login method from AuthService
          const result = await AuthService.login(credentials);

          console.log("login result = ", result);
    
          // Save tokens to local storage
          localStorage.setItem("authTokens", JSON.stringify(result));
    
          // Set the state with the decoded user and tokens
          const decodedUser = jwtDecode(result.accessToken);
          setUser(decodedUser);
          setAuthTokens(result);

          // Use 'success' for show some data
          setSuccess(true);

          // Redirect or perform any other actions upon successful login
          // navigate('/profile');
    
        } catch (error) {
          setSuccess(false);
          console.error("Error during login:", error.message);
        }
    };

    const logOutCurrentUser = async (email) => {
      try {
        // Call the logout method from AuthService
        const result = await AuthService.logout(email);

        // Reset the user data and tokens
        setUserLogout(true);
        setAuthTokens(null);
        setUser(null);

        // Remove tokens from local storage
        localStorage.removeItem('authTokens');

        setSuccess(false);

        // Redirect or perform any other actions upon successful logout
        navigate('/');
  
      } catch (error) {
        setSuccess(true);
        console.error("Error during logout:", error.message);
      }
    }


    const contextData = {
        success: success, 
        user: user,
        authTokens:authTokens,
        signInCurrentUser: signInCurrentUser,
        loginCurrentUser: loginCurrentUser,
        logOutCurrentUser: logOutCurrentUser,
    }

    return (
        <AuthContext.Provider value = { contextData }>  
           { children }
        </AuthContext.Provider>
    )
}