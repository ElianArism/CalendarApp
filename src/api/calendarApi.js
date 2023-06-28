import axios from "axios";
import { getEnvironmentVariables } from "../env/getEnvVars";

const { VITE_API_URL } = getEnvironmentVariables();

const API = axios.create({
  baseURL: VITE_API_URL,
});

// Interceptor to add x-token in all the requests
API.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("x-token"),
  };

  return config;
});

export default API;
