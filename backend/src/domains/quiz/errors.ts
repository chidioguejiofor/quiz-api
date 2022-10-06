import { QuizBaseError } from "shared/errors";

export class Invalid extends QuizBaseError {}
export class QuizNotFound extends QuizBaseError {}
export class QuizAlreadyPublished extends QuizBaseError {}
export class QuestionNotFound extends QuizBaseError {}
export class NotEnoughQuestionsInQuiz extends QuizBaseError {}
export class CannotEditPublishedQuiz extends QuizBaseError {}
export class QuestionMustHaveAtLeastOneAnswer extends QuizBaseError {}
