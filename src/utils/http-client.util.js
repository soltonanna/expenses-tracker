import axios from 'axios'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 5000
});

let isRefreshing = false;
let refreshSubscribers = [];

function refreshToken() {
  const token = localStorage.getItem("refreshToken");
  return axiosInstance.post('/auth/refresh', { refreshToken: token })
    .then((response) => {
      const { refreshToken, accessToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      refreshSubscribers.forEach((callback) => callback(accessToken));
      refreshSubscribers = [];
    })
    .catch((error) => {
      console.error('Failed to refresh token:', error);
    });
}

const AxiosInterceptor =  () => {
  const { logOutUser } = useContext(AuthContext);

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken")

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const { config, response: { status } } = error;
      const originalRequest = config;

      if (status === 401) {
        if (!isRefreshing) {

          isRefreshing = true;

          return refreshToken()
            .then((newAccessToken) => {
              isRefreshing = false;

              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

              return axiosInstance(originalRequest);
            })
            .finally(() => {
              isRefreshing = false;
            });
        } 
        else {
          if (config.url === '/auth/refresh' && isRefreshing) {
            await logOutUser(localStorage.getItem("user"));
          }
          return new Promise((resolve) => {
            refreshSubscribers.push((newAccessToken) => {
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }
      }

      return Promise.reject(error);
    }
  );
}

export { axiosInstance, AxiosInterceptor };