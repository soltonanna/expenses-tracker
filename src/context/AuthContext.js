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
      //logOutCurrentUser();
      setUserLogout(true);
    }
  }, [userLogout]);

  const handleTokenExpiration = () => {
    console.log("----handleTokenExpiration---")
    setSuccessAuth(false);
    setAccessToken(null);
    setUser(null);

    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

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
  const logOutCurrentUser = async (email) => {
    try {
      const result = await AuthService.logout(email);

      //setUserLogout(true);
      setSuccessAuth(false);
      setAccessToken(null);
      setUser(null);

      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/');

    } catch (error) {
      //setSuccessAuth(true);
      console.error("ERROR: Error during logout:", error.message);
    }
  }

  /** Refresh Token */
  const refreshTokens = async () => {
    try {
      const newTokens = await AuthService.refresh(refreshToken);
      //localStorage.setItem("accessToken", JSON.stringify(newTokens));
      localStorage.setItem("accessToken", newTokens.accessToken);
      localStorage.setItem("refreshToken", newTokens.refreshToken);

      setAccessToken(newTokens);

      const decodedUser = jwtDecode(newTokens.accessToken);
      setUser(decodedUser);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized access. Redirecting to login...");
        handleTokenExpiration();
      } else {
        console.error("ERROR: Error during refreshing tokens:", error.message);
      }
    }
  };

  const contextData = {
    user,
    accessToken,
    successAuth,
    refreshTokens,
    signInCurrentUser,
    loginCurrentUser,
    logOutCurrentUser
  }

  return (
    <AuthContext.Provider value = { contextData }>  
      { children }
    </AuthContext.Provider>
  )
}