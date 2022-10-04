import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import { Credentials, SignupInput } from "./types";

export class Auth {
  public static async login(credentials: Credentials) {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);

      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        alert("Invalid input");
      }
    }
  }

  public static async signup(signupInput: SignupInput) {
    try {
      const res = await axiosInstance.post("/auth/register", signupInput);

      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        alert("Invalid input");
      }

      if (axiosError.response?.status === 409) {
        alert("Email already exists");
      }
    }
  }
}
