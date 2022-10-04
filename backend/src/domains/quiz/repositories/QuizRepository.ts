import { QuizEntity } from "../entities";
import { QuizNotFound } from "../errors";
import { Quiz } from "../models/quiz";

export class QuizRepository {
  public static async createQuiz(input: QuizEntity): Promise<QuizEntity> {
    return Quiz.create(input);
  }

  public static async fetchAllAuthorQuiz(
    authorId: string
  ): Promise<QuizEntity[]> {
    return Quiz.findAll({
      where: {
        authorId,
      },
    });
  }

  public static async getQuiz(
    authorId: string,
    quizId: string
  ): Promise<QuizEntity | null> {
    return Quiz.findOne({
      where: {
        authorId,
        id: quizId,
      },
    });
  }

  public static async deleteQuiz(
    authorId: string,
    quizId: string
  ): Promise<void> {
    const deleted = await Quiz.destroy({
      where: {
        authorId,
        id: quizId,
      },
    });
    if (!deleted) {
      throw new QuizNotFound();
    }
  }
}

export type QuizRepositoryType = typeof QuizRepository;
