import axios from 'axios';

const baseURL = 'http://localhost:8000';
const timeout = 5000

const axiosInstance = axios.create({ baseURL, timeout })

export default axiosInstance