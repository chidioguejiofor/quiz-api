import { QuizNotFound } from "../errors";
import { QuizRepositoryType } from "../repositories/index";

export class FetchQuestionsByPermalinkUsecase {
  constructor(private quizRepository: QuizRepositoryType) {}

  async execute(permalink: string) {
    const questions = await this.quizRepository.fetchQuestionByPermalink(
      permalink
    );

    if (!questions.length) throw new QuizNotFound();
    return questions;
  }
}
