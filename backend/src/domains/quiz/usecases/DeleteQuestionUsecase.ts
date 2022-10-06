import { AppLogger } from "shared/logger";
import { validateSchema } from "shared/utils/validation";

import {
  CannotEditPublishedQuiz,
  QuestionNotFound,
  QuizNotFound,
} from "../errors";
import { QuizRepositoryType } from "../repositories/index";
import { deleteQuestionInputSchema } from "../validators";

const logger = AppLogger.create("DeleteQuestionUsecase");

export class DeleteQuestionUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(authorId: string, questionId: string, quizId: string) {
    logger.info("Updating a question...");

    validateSchema({ questionId, quizId }, deleteQuestionInputSchema);
    this.validateQuiz(authorId, quizId);

    await this.deleteQuestion(questionId, quizId);

    logger.info("Successfully deleted Question");
  }

  private async deleteQuestion(questionId: string, quizId: string) {
    const deleted = await this.quizRepository.deleteQuestion(
      questionId,
      quizId
    );

    if (!deleted) throw new QuestionNotFound();
  }

  private async validateQuiz(authorId: string, quizId: string) {
    logger.info("Validating quizId..");

    const quiz = await this.quizRepository.getQuiz(authorId, quizId);
    if (!quiz) throw new QuizNotFound();
    if (quiz.status !== "draft") throw new CannotEditPublishedQuiz();

    logger.info("Quiz is valid");
  }
}
