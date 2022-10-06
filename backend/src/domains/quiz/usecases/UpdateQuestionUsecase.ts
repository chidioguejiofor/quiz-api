import { AppLogger } from "shared/logger";
import { validateSchema } from "shared/utils/validation";
import { QuestionEntity } from "../entities";

import {
  CannotEditPublishedQuiz,
  QuestionMustHaveAtLeastOneAnswer,
  QuizNotFound,
} from "../errors";
import { QuizRepositoryType } from "../repositories/index";
import { QuestionInput } from "../types";
import { updateQuestionInputSchema } from "../validators";

const logger = AppLogger.create("UpdateQuestionUsecase");

export class UpdateQuestionUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(
    authorId: string,
    input: Partial<QuestionInput>,
    questionId: string
  ) {
    logger.info("Updating a question...");
    const quizId = input.quizId as string;
    validateSchema({ ...input, questionId }, updateQuestionInputSchema);
    this.validateQuiz(authorId, quizId);

    const question = await this.updateQuestion(
      quizId,
      questionId,
      input as QuestionInput
    );
    logger.info("Successfully updated Question");

    return question;
  }

  private async validateQuiz(authorId: string, quizId: string) {
    logger.info("Validating quizId..");

    const quiz = await this.quizRepository.getQuiz(authorId, quizId);
    if (!quiz) throw new QuizNotFound();
    if (quiz.status !== "draft") {
      throw new CannotEditPublishedQuiz();
    }

    logger.info("Quiz is valid");
  }

  private async updateQuestion(
    quizId: string,
    questionId: string,
    input: QuestionInput
  ) {
    const { numberOfAnswers, options } = this.buildOptions(questionId, input);

    const questionObject = {
      title: input.title,
      imageURL: input.imageURL,
      numberOfAnswers,
    };
    await this.quizRepository.updateQuestion(
      questionObject as QuestionEntity,
      quizId,
      questionId
    );
    await this.quizRepository.clearQuestionOptions(questionId);
    await this.quizRepository.addQuestionOptions(options);
    const newQuestions = await this.quizRepository.fetchQuestions(
      input.quizId as string,
      questionId
    );
    return newQuestions[0];
  }

  private buildOptions(questionId: string, input: QuestionInput) {
    let numberOfAnswers = 0;
    const options = input.options.map((option) => {
      numberOfAnswers += +option.isAnswer;
      return {
        text: option.text,
        isAnswer: option.isAnswer,
        questionId,
      };
    });

    if (numberOfAnswers === 0) throw new QuestionMustHaveAtLeastOneAnswer();

    return { numberOfAnswers, questionId, options };
  }
}
