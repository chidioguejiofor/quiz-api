import { QuizBaseError } from "shared/errors";

export class Invalid extends QuizBaseError {}
export class QuizNotFound extends QuizBaseError {}
export class CannotEditPublishedQuiz extends QuizBaseError {}
export class QuestionMustHaveAtLeastOneAnswer extends QuizBaseError {}
