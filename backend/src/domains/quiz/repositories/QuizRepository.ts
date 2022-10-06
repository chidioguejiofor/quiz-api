import { OptionEntity, QuestionEntity, QuizEntity } from "../entities";
import { QuestionNotFound, QuizNotFound } from "../errors";
import { Question } from "../models/question";
import { Option } from "../models/option";
import { Quiz } from "../models/quiz";
import { WhereOptions } from "sequelize";

export class QuizRepository {
  static deleteQuestion(questionId: string, quizId: string) {
    return Question.destroy({
      where: {
        id: questionId,
        quizId,
      },
    });
  }
  public static async createQuiz(input: QuizEntity): Promise<QuizEntity> {
    return Quiz.create(input);
  }

  public static async fetchAuthorQuiz(
    authorId: string,
    quizId?: string | string[]
  ): Promise<QuizEntity[]> {
    const where: WhereOptions = {
      authorId,
    };
    if (quizId) {
      where["id"] = quizId;
    }
    return Quiz.findAll({
      where,
    });
  }

  public static async fetchQuestions(
    quizId: string,
    questionIds?: string | string[]
  ): Promise<QuestionEntity[]> {
    const where: WhereOptions = {
      quizId,
    };
    if (questionIds) {
      where["id"] = questionIds;
    }
    return Question.findAll({
      where,
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

  public static async clearQuestionOptions(questionId: string) {
    return Option.destroy({ where: { questionId } });
  }

  public static async updateQuestion(
    questionObject: QuestionEntity,
    quizId: string,
    questionId: string
  ) {
    const [updated] = await Question.update(questionObject, {
      where: { id: questionId, quizId },
    });

    if (!updated) throw new QuestionNotFound();
  }
}

export type QuizRepositoryType = typeof QuizRepository;
