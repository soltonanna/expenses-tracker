import React, { createContext, useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import AuthService from '../services/auth.service' 
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
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

          // Redirect or perform any other actions upon successful login
          navigate('/profile');
    
        } catch (error) {
          // Handle login errors, for example, display an error message to the user
          console.error("Error during login:", error.message);
        }
    };


    const contextData = {
        user: user,
        authTokens:authTokens,
        loginCurrentUser: loginCurrentUser,
    }

    return (
        <AuthContext.Provider value = { contextData }>  
           { children }
        </AuthContext.Provider>
    )
}