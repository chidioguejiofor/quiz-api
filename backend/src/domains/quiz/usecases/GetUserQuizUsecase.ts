import { QuizRepositoryType } from "../repositories/index";

export class GetUserQuizUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(authorId: string) {
    return this.quizRepository.fetchAllAuthorQuiz(authorId);
  }
}
