import { QuestionData, QuestionInput } from "core/models/quiz";
import axiosInstance from "./axiosInstance";
import { apiCallErrorHandler } from "utils/apiCallErrorHandler";

export class Question {
  public static async delete(
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
      return apiCallErrorHandler(error);
    }
  }

  public static async create(input: QuestionInput, token: string) {
    try {
      const res = await axiosInstance.post("/quiz/questions", input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return apiCallErrorHandler(error);
    }
  }

  public static async update(input: QuestionData, token: string) {
    try {
      const endpoint = `/quiz/questions/${input.id}`;
      const res = await axiosInstance.put(endpoint, input, {
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
