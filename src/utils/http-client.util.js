import axios from 'axios';
import AuthService from '../services/auth.service';

const baseURL = 'http://localhost:8000/api/v1';
const timeout = 5000;

const axiosInstance = axios.create({ baseURL, timeout });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        console.log('ERROR: Unauthorized access. Refreshing token...');
        originalRequest._retry = true;
        
        try {
          const newTokens = await AuthService.refresh(localStorage.getItem('refreshToken'));
          localStorage.setItem('accessToken', newTokens.accessToken);
          localStorage.setItem('refreshToken', newTokens.refreshToken);
          //const originalRequest = error.config;
          //originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;

          return axios(originalRequest);

        } catch (refreshError) {
          console.log('ERROR: Error refreshing token:', refreshError.message);
          // TODO: fix the logout functionality
          await AuthService.logout(localStorage.getItem('user'));
          return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;