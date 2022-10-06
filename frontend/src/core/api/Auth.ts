import { AxiosError } from "axios";
import { apiCallErrorHandler } from "utils/apiCallErrorHandler";
import axiosInstance from "./axiosInstance";
import { Credentials, SignupInput } from "./types";

export class Auth {
  public static async login(credentials: Credentials) {
    const res = await axiosInstance.post("/auth/login", credentials);
    return res.data;
  }

  public static async signup(signupInput: SignupInput) {
    try {
      const res = await axiosInstance.post("/auth/register", signupInput);

      return res.data;
    } catch (error) {
      return await apiCallErrorHandler(error);
    }
  }
}
