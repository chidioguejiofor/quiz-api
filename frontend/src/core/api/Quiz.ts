import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

type QuizInput = {
  title: string;
};
export class Quiz {
  public static async createQuiz(input: QuizInput, token: string) {
    try {
      const res = await axiosInstance.post("/quiz", input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        alert("Invalid input");
      } else {
        alert("An error occured");
      }
    }
  }
}
