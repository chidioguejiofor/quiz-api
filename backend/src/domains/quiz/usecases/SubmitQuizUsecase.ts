import { AppLogger } from "shared/logger";
import { validateSchema } from "shared/utils/validation";
import { Question } from "../models/question";
import { QuizRepositoryType } from "../repositories/index";
import { submitQuizSchema } from "../validators";

const logger = AppLogger.create("SubmitQuizUsecase");

export class SubmitQuizUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(permalink: string, userAnswers: Record<string, string[]>) {
    logger.info("Submitting Quiz...");
    validateSchema({ permalink }, submitQuizSchema);
    this.valideAnswers(userAnswers);
    const questions = await this.quizRepository.fetchQuestionByPermalink(
      permalink,
      ["id", "text", "isAnswer"]
    );

    const correctAnswerCount = this.calculateCorrectAnswers(
      questions,
      userAnswers
    );

    return { correctAnswerCount, totalQuestions: questions.length };
    logger.info("Successfully published Quiz");
  }
  private calculateCorrectAnswers(
    questions: Question[],
    userAnswers: Record<string, string[]>
  ) {
    let correctAnswerCount = 0;
    for (const question of questions) {
      const userQuestionAnswer = new Set(userAnswers[question.id]);
      let userIsCorrect = true;
      for (const option of question.options) {
        if (option.isAnswer) {
          console.log(option.text);
          userIsCorrect = userIsCorrect && userQuestionAnswer.has(option.id);
        }
      }
      if (userIsCorrect) correctAnswerCount++;
    }
    return correctAnswerCount;
  }

  valideAnswers(answers: Record<string, string[]>) {
    for (const answerValue of Object.values(answers)) {
      if (!Array.isArray(answerValue)) {
        throw new Error("Some answers are invalid");
      }
    }
  }
}
