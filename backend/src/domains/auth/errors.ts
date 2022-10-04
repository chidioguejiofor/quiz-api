import { QuizBaseError } from "shared/errors";

export class VerificationFailed extends QuizBaseError {}
export class UserExists extends QuizBaseError {}
export class UserNotFound extends QuizBaseError {}
export class InvalidSession extends QuizBaseError {}
export class SessionExpired extends QuizBaseError {}
