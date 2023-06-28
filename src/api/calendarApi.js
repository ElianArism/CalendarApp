import axios from "axios";
import { getEnvironmentVariables } from "../env/getEnvVars";

const { VITE_API_URL } = getEnvironmentVariables();

const API = axios.create({
  baseURL: VITE_API_URL,
});

export default API;
