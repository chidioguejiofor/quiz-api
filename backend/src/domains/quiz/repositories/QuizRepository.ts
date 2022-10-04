import { QuizEntity } from "../entities";
import { Quiz } from "../models/quiz";

export class QuizRepository {
  public static async createQuiz(input: QuizEntity): Promise<QuizEntity> {
    return Quiz.create(input);
  }
}

export type QuizRepositoryType = typeof QuizRepository;
