import { AppLogger } from "shared/logger";
import { validateSchema } from "shared/utils/validation";
import { QuizRepositoryType } from "../repositories/index";
import { updateQuizInputSchema } from "../validators";

type QuizInput = {
  title: string;
  imageURL?: string;
};

const logger = AppLogger.create("UpdateQuizUsecase");

export class UpdateQuizUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(authorId: string, quizId: string, input: QuizInput) {
    logger.info("Update Quiz...");
    validateSchema({ ...input, authorId }, updateQuizInputSchema);
    const quiz = await this.quizRepository.updateQuiz(authorId, quizId, input);
    logger.info("Successfully updated Quiz");

    return quiz;
  }
}
