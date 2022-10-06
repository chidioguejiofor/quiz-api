import { AxiosError } from "axios";
import { QuestionData, QuestionInput } from "core/models/quiz";
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
  public static async deleteQuiz(quizId: string, token: string) {
    try {
      const res = await axiosInstance.delete(`/quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        alert("Invalid input");
      }
      throw error;
    }
  }

  public static async deleteQuestion(
    question: Pick<QuestionData, "quizId" | "id">,
    token: string
  ) {
    try {
      const res = await axiosInstance.delete(`/quiz/questions/${question.id}`, {
        data: question,
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

  public static async createQuestion(input: QuestionInput, token: string) {
    try {
      const res = await axiosInstance.post("/quiz/questions", input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        alert("Invalid input");
      }
      throw error;
    }
  }

  public static async updateQuestion(input: QuestionData, token: string) {
    try {
      const endpoint = `/quiz/questions/${input.id}`;
      const res = await axiosInstance.put(endpoint, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        alert("Invalid input");
      }
      throw error;
    }
  }
}
