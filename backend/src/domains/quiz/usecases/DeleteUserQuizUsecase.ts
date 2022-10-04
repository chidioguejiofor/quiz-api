import { AppLogger } from "shared/logger";
import { QuizRepositoryType } from "../repositories";

const logger = AppLogger.create("CreateQuestionUsecase");

export class DeleteUserQuizUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(authorId: string, quizId: string) {
    logger.info("Deleting quiz...");
    await this.quizRepository.deleteQuiz(authorId, quizId);
    logger.info("Successfully deleted quiz");
  }
}
