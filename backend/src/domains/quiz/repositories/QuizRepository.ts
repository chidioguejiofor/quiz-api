import { OptionEntity, QuestionEntity, QuizEntity } from "../entities";
import { QuizNotFound } from "../errors";
import { Question } from "../models/question";
import { Option } from "../models/option";
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

  public static async fetchQuestions(
    quizId: string
  ): Promise<QuestionEntity[]> {
    return Question.findAll({
      where: {
        quizId,
      },
      include: [
        {
          model: Option,
          attributes: ["text", "isAnswer"],
        },
      ],
    });
  }

  public static async getQuiz(
    authorId: string,
    quizId: string
  ): Promise<QuizEntity | null> {
    console.log("Quiz id==>", quizId);
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

  public static async createQuestion(
    input: QuestionEntity
  ): Promise<QuestionEntity> {
    return Question.create(input);
  }

  public static async addQuestionOptions(options: OptionEntity[]) {
    return Option.bulkCreate(options);
  }
}

export type QuizRepositoryType = typeof QuizRepository;
