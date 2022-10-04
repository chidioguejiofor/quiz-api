import { QuizRepositoryType } from "../repositories/index";

export class DeleteUserQuizUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(authorId: string, quizId: string) {
    await this.quizRepository.deleteQuiz(authorId, quizId);
  }
}
