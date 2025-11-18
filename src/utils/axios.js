import axios from "axios";
import Cookies from "js-cookie";

export const baseDomain = "https://api.fastnfresh.app/proconnect/";

export const axiosInstance = axios.create({
  baseURL: baseDomain,
  timeout: 15000,
  withCredentials: true,
});

// Request Interceptor
const RequestInterceptor = (config) => {
  const token = Cookies.get("token");
  // console.log("Token:", token); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
  }
  return config;
};

// Response Interceptor
const ResponseInterceptor = (response) => response;

// Error Handling Interceptor
const ErrorInterceptor = (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 509;

  if (!expectedErrors) {
   // console.error("Unexpected error:", error);
    return Promise.reject(error);
  }

  // Handle expected errors
  return Promise.reject(error.response);
};

// Apply interceptors
axiosInstance.interceptors.request.use(RequestInterceptor);
axiosInstance.interceptors.response.use(ResponseInterceptor, ErrorInterceptor);

export default axiosInstance;
