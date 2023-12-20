import React, { createContext, useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import AuthService from '../services/auth.service';
import UsersService from "../services/users.service";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {
  const [successAuth, setSuccessAuth] = useState(false);
  const [userLogout, setUserLogout] = useState(false);

  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  let refreshSubscribers = [];
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);

      const decodedUser = jwtDecode(accessToken);
      setUser(decodedUser);
    }
  }, []);

  useEffect( ()=> {
    if( userLogout ) {
      setUserLogout(true);
    }
  }, [userLogout]);


  /** SignIn */
  const signInUser = async (credentials) => {
    try {
      const result = await UsersService.signup(credentials);
      setSuccessAuth(true);

    } catch (error) {
      console.error("ERROR: Error during sign up:", error.message);
    }
  }

  /** LogIn */
  const logInUser = async (credentials) => {
    try {
      const result = await AuthService.login(credentials);
      
      const { accessToken, refreshToken } = result;

      localStorage.setItem("user", result.user.email);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      
      setAccessToken(accessToken);
      setRefreshToken(refreshToken)

      const decodedUser = jwtDecode(accessToken);
      setUser(decodedUser);

      setSuccessAuth(true);
      navigate('/profile');

    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshTokens();
      } else {
        console.error("ERROR: Error during login:", error.message);
      }
    }
  };

  /** LogOut */
  const logOutUser = async (email) => {
    try {
      await AuthService.logout(email);

      setSuccessAuth(false);
      setAccessToken(null);
      setUser(null);

      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/#/login');

    } catch (error) {
      console.error("ERROR: Error during logout:", error.message);
    }
  }

  /** Refresh Token */
  // const refreshTokens = async () => {
  //   try {
  //     const token = localStorage.getItem("refreshToken");
  //     const response = await axiosInstance.post('/auth/refresh', { refreshToken: token });
  //     const { refreshToken, accessToken } = response.data;
  
  //     localStorage.setItem('accessToken', accessToken);
  //     localStorage.setItem('refreshToken', refreshToken);
  
  //     refreshSubscribers.forEach((callback) => callback(accessToken));
  //     refreshSubscribers = [];
  //   } catch (error) {
  //     console.error('Failed to refresh token:', error);
  //   }
  // };

  const contextData = {
    user,
    //refreshToken,
    successAuth,
    signInUser,
    logInUser,
    logOutUser
  }

  return (
    <AuthContext.Provider value = { contextData }>  
      { children }
    </AuthContext.Provider>
  )
}