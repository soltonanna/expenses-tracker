import React, { createContext, useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import AuthService from '../services/auth.service';
import UsersService from "../services/users.service";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/http-client.util";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {
    const [successAuth, setSuccessAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [userLogout, setUserLogout] = useState(false);
    const [authTokens, setAuthTokens] = useState(null);
    const [accessToken, setAccessToken] = useState('');

    const navigate = useNavigate();

    // useEffect(() => {
    //     const tokens = JSON.parse(localStorage.getItem("accessToken"));
    //     if (tokens) {
    //       setAuthTokens(tokens);
    //       const decodedUser = jwtDecode(tokens.accessToken);
    //       setUser(decodedUser);
    //     }
    // }, []);
    useEffect(() => {
      const storedTokens = localStorage.getItem("accessToken");
    
      try {
        if (storedTokens) {
          const tokens = JSON.parse(storedTokens);
    
          if (tokens && typeof tokens.accessToken === 'string') {
            setAuthTokens(tokens);
    
            const decodedUser = jwtDecode(tokens.accessToken);
            console.log("Decoded User:", decodedUser);
    
            setUser(decodedUser);
          } else {
            console.error("Invalid accessToken format:", tokens.accessToken);
          }
        }
      } catch (error) {
        console.error("Error decoding accessToken:", error);
      }
    }, []);
    

    useEffect( ()=> {
      if( userLogout ) {
        logOutCurrentUser();
      }
    }, [userLogout]);

    /** SignIn */
    const signInCurrentUser = async (credentials) => {
      try {
        const result = await UsersService.signup(credentials);
        setSuccessAuth(true);

      } catch (error) {
        console.error("ERROR: Error during sign up:", error.message);
      }
    }

    /** LogIn */
    const loginCurrentUser = async (credentials) => {
      try {
        const result = await AuthService.login(credentials);
    
        if (!result || !result.accessToken) {
          console.error("ERROR: Invalid result structure:", result);
          return;
        }
    
        const accessTokenString = String(result.accessToken);
    
        localStorage.setItem("accessToken", JSON.stringify(accessTokenString));
    
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessTokenString}`;
    
        const decodedUser = jwtDecode(accessTokenString);
        console.log(decodedUser);
        
        setUser(decodedUser);
        setAuthTokens(result);
        setAccessToken(accessTokenString);
    
        setSuccessAuth(true);
        // navigate('/profile');
    
      } catch (error) {
        if (error.response && error.response.status === 401) {
          await refreshTokens();
        } else {
          console.error("ERROR: Error during login:", error.message);
        }
      }
    };    

    /** LogOut */
    const logOutCurrentUser = async (email) => {
      try {
        const result = await AuthService.logout(email);

        setUserLogout(true);
        setAuthTokens(null);
        setAccessToken(null);
        setUser(null);
        setSuccessAuth(false);

        localStorage.removeItem('accessToken');
        navigate('/');
  
      } catch (error) {
        setSuccessAuth(true);
        console.error("ERROR: Error during logout:", error.message);
      }
    }

    /** Refresh Token */
    const refreshTokens = async () => {
      try {
        const newTokens = await AuthService.refresh(authTokens.refreshToken);
        setAccessToken(newTokens);
        const decodedUser = jwtDecode(newTokens.accessToken);
        setUser(decodedUser);
        localStorage.setItem("accessToken", JSON.stringify(newTokens.accessToken));

      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          navigate('/login');
        } else {
          console.error("ERROR: Error during refreshing tokens:", error.message);
        }
      }
    };


    const contextData = {
        successAuth: successAuth, 
        user: user,
        authTokens: authTokens,
        accessToken: accessToken,
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

















// import axios from 'axios';
// import AuthService from '../services/auth.service';

// const baseURL = 'http://localhost:8000/api/v1';
// const timeout = 5000;

// const axiosInstance = axios.create({ baseURL, timeout });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   response => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//         console.log('ERROR: Unauthorized access. Refreshing token...');
//         try {
//           const newTokens = await AuthService.refresh(localStorage.getItem('refreshToken'));
//           localStorage.setItem('accessToken', newTokens.accessToken);
//           localStorage.setItem('refreshToken', newTokens.refreshToken);

//           const originalRequest = error.config;
//           //originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
//           return axios(originalRequest);
//         } catch (refreshError) {
//           console.log('ERROR: Error refreshing token:', refreshError.message);
//           await AuthService.logout(localStorage.getItem('user'));
//         }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;