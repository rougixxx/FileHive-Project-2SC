import axios from 'axios';
import { getCookie } from 'cookies-next';

// api.ts

/**
  Axios instance to send requests
*/
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  timeout: 20000,
  headers:{
    Accept: 'application/json',
  }
});

// Add a request interceptor to add the token to each request
API.interceptors.request.use(async (config) => {
  const auth_token = getCookie('auth_token'); // retrieve token from cookies
  
  // If the token exists, add it to the Authorization header
  if (auth_token) {
    config.headers.Authorization = `Bearer ${auth_token}`;
  }

  return config;
});

export default API;
