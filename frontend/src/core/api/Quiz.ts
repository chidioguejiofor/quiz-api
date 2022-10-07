import axiosInstance from "./axiosInstance";
import { apiCallErrorHandler } from "utils/apiCallErrorHandler";

type QuizInput = {
  title: string;
};

export class Quiz {
  public static async submitQuiz(
    permalink: string,
    userAnswers: Record<string, string[]>
  ) {
    try {
      const res = await axiosInstance.post(`/quiz/${permalink}/submit`, {
        userAnswers,
      });

      return res.data;
    } catch (error) {
      return apiCallErrorHandler(error);
    }
  }
  public static async publish(quizId: string, token: string) {
    try {
      const res = await axiosInstance.post(`/quiz/${quizId}/publish`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return apiCallErrorHandler(error);
    }
  }
  public static async create(input: QuizInput, token: string) {
    try {
      const res = await axiosInstance.post("/quiz", input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return apiCallErrorHandler(error);
    }
  }

  public static async update(quizId: string, input: QuizInput, token: string) {
    try {
      const res = await axiosInstance.put(`/quiz/${quizId}`, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return apiCallErrorHandler(error);
    }
  }

  public static async delete(quizId: string, token: string) {
    try {
      const res = await axiosInstance.delete(`/quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return apiCallErrorHandler(error);
    }
  }
}
