import axios from "axios";

import Cookies from 'js-cookie';
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to dynamically add the latest token before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Get the latest token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
