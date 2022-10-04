import { AuthAPIType } from "domains/auth/apis";
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
  constructor(
    private authAPI: AuthAPIType,
    private quizRepository: QuizRepositoryType
  ) {}

  async execute(authorId: string, input: QuizInput) {
    logger.info("Creating Quiz...");

    const quizEntity = await this.validate(authorId, input);
    const quiz = await this.quizRepository.createQuiz(quizEntity);
    logger.info("Successfully created Quiz");

    return quiz;
  }

  private async validate(authorId: string, input: QuizInput) {
    const quizEntity = {
      ...input,
      authorId,
      status: "draft" as const,
    };
    validateSchema(quizEntity, createQuizInputValidatorSchema);

    return quizEntity;
  }
}
