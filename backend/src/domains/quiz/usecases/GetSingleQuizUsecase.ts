import { QuizNotFound } from "../errors";
import { QuizRepositoryType } from "../repositories/index";

export class GetSingleQuizUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(authorId: string, quizId: string) {
    const quizes = await this.quizRepository.fetchAuthorQuiz(authorId, quizId);

    if (!quizes.length) throw new QuizNotFound();
    return quizes[0];
  }
}
