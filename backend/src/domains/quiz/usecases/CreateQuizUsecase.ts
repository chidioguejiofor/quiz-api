import { AppLogger } from "shared/logger";
import { validateSchema } from "shared/utils/validation";
import { QuizRepositoryType } from "../repositories/index";
import { createQuizInputValidatorSchema } from "../validators";

type QuizInput = {
  title: string;
  imageURL?: string;
};

const logger = AppLogger.create("CreateQuizUsecase");

export class CreateQuizUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(authorId: string, input: QuizInput) {
    logger.info("Creating Quiz...");

    const quizInput = {
      ...input,
      status: "draft" as const,
      authorId,
    };

    validateSchema(quizInput, createQuizInputValidatorSchema);
    const quiz = await this.quizRepository.createQuiz(quizInput);
    logger.info("Successfully created Quiz");

    return quiz;
  }
}
