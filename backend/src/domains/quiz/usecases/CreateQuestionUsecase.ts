import { AppLogger } from "shared/logger";
import { validateSchema } from "shared/utils/validation";
import { v4 } from "uuid";
import {
  CannotEditPublishedQuiz,
  QuestionMustHaveAtLeastOneAnswer,
  QuizNotFound,
} from "../errors";
import { QuizRepositoryType } from "../repositories/index";
import { addQuestionInputValidatorSchema } from "../validators";

type QuestionInput = {
  title: string;
  imageURL: string;
  quizId: string;
  options: {
    text: string;
    isAnswer: boolean;
  }[];
};

const logger = AppLogger.create("CreateQuestionUsecase");

export class CreateQuestionUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(authorId: string, input: Partial<QuestionInput>) {
    logger.info("Adding a question to a quiz...");

    validateSchema(input, addQuestionInputValidatorSchema);
    this.validateQuiz(authorId, input.quizId as string);

    const question = await this.createQuestion(input as QuestionInput);
    logger.info("Successfully created Question");

    return question;
  }
  private async validateQuiz(authorId: string, quizId: string) {
    const quiz = await this.quizRepository.getQuiz(authorId, quizId);
    if (!quiz) throw new QuizNotFound();
    if (quiz.status !== "draft") {
      throw new CannotEditPublishedQuiz();
    }
  }

  private async createQuestion(input: QuestionInput) {
    const { numberOfAnswers, questionId, options } = this.buildOptions(input);

    await this.quizRepository.createQuestion({
      id: questionId,
      title: input.title,
      imageURL: input.imageURL,
      quizId: input.quizId,
      numberOfAnswers,
    });
    await this.quizRepository.addQuestionOptions(options);
    const newQuestions = await this.quizRepository.fetchQuestions(
      input.quizId as string,
      questionId
    );
    return newQuestions[0];
  }

  private buildOptions(input: QuestionInput) {
    let numberOfAnswers = 0;
    const questionId = v4();
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
