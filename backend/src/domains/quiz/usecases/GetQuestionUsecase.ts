import { InvalidInputData } from "shared/errors";
import { QuizNotFound, CannotEditPublishedQuiz } from "../errors";
import { QuizRepositoryType } from "../repositories/index";

export class GetQuestionUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(authorId: string, quizId?: string) {
    await this.validateQuiz(authorId, quizId);

    return this.quizRepository.fetchQuestions(quizId as string);
  }

  private async validateQuiz(authorId: string, quizId?: string) {
    if (!quizId)
      throw new InvalidInputData("Quiz not specified", {
        quizId: ["Required"],
      });
    const quiz = await this.quizRepository.getQuiz(authorId, quizId);
    if (!quiz) throw new QuizNotFound();
    if (quiz.status !== "draft") {
      throw new CannotEditPublishedQuiz();
    }
  }
}
