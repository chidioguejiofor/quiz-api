import { QuizBaseError } from "shared/errors";

export class BaseAuthError extends QuizBaseError {}
export class VerificationFailed extends BaseAuthError {}
export class UserExists extends BaseAuthError {}
export class UserNotFound extends BaseAuthError {}
export class InvalidSession extends BaseAuthError {}
export class SessionExpired extends BaseAuthError {}
export class MustBeLoggedIn extends BaseAuthError {}
