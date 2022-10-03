export class QuizBaseError extends Error {
  errors;
  constructor(input?: string, errors?: any) {
    super(input);
    this.errors = errors;
  }
}

export class InvalidInputData extends QuizBaseError {}
