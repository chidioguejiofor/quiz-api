import { AppLogger } from "shared/logger";
import { validateSchema } from "shared/utils/validation";
import {
  NotEnoughQuestionsInQuiz,
  QuizAlreadyPublished,
  QuizNotFound,
} from "../errors";
import { QuizRepositoryType } from "../repositories/index";
import { publishQuizSchema } from "../validators";

const logger = AppLogger.create("PublishQuizUsecase");

export class PublishQuizUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(authorId: string, quizId: string) {
    logger.info("Updating Quiz...");
    validateSchema({ quizId, authorId }, publishQuizSchema);
    const quiz = await this.quizRepository.getQuiz(authorId, quizId);

    const questions = await this.quizRepository.fetchQuestions(quizId);
    if (questions.length < 2) {
      throw new NotEnoughQuestionsInQuiz();
    }

    if (!quiz) throw new QuizNotFound();
    if (quiz.status !== "draft") throw new QuizAlreadyPublished();

    const updatedQuiz = await this.quizRepository.publishQuiz(authorId, quizId);
    logger.info("Successfully published Quiz");

    return updatedQuiz;
  }
}
