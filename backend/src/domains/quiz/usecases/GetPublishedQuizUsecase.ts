import { QuizRepositoryType } from "../repositories/index";

export class GetPublishedQuizUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute() {
    return this.quizRepository.fetchPublishedQuiz();
  }
}
