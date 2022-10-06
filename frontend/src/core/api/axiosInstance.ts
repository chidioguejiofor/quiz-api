import axios, { AxiosError } from "axios";
import { pages } from "constants/pages";
import { BASE_API_URL } from "constants/settings";
import { signOut } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: `${BASE_API_URL}/api`,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      let callback = pages.login;
      if (typeof window !== "undefined") {
        callback = `${callback}?next=${location.pathname}`;
      }

      signOut({ callbackUrl: callback });
      return;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
