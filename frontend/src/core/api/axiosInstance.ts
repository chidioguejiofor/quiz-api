import axios from "axios";
import { BASE_API_URL } from "constants/settings";

const axiosInstance = axios.create({
  baseURL: `${BASE_API_URL}/api`,
});

export default axiosInstance;
