import { QuizRepository } from "../repositories/QuizRepository";
import { CreateQuestionUsecase } from "./CreateQuestionUsecase";
import { CreateQuizUsecase } from "./CreateQuizUsecase";
import { DeleteQuestionUsecase } from "./DeleteQuestionUsecase";
import { DeleteUserQuizUsecase } from "./DeleteUserQuizUsecase";
import { GetQuestionUsecase } from "./GetQuestionUsecase";
import { GetSingleQuizUsecase } from "./GetSingleQuizUsecase";
import { GetUserQuizUsecase } from "./GetUserQuizUsecase";
import { UpdateQuestionUsecase } from "./UpdateQuestionUsecase";

export const createQuestionUsecase = new CreateQuestionUsecase(QuizRepository);
export const updateQuestionUsecase = new UpdateQuestionUsecase(QuizRepository);
export const deleteQuestionUsecase = new DeleteQuestionUsecase(QuizRepository);
export const getQuestionUsecase = new GetQuestionUsecase(QuizRepository);

export const createQuizUsecase = new CreateQuizUsecase(QuizRepository);
export const retrieveQuizUsecase = new GetUserQuizUsecase(QuizRepository);
export const retrieveSingleQuizUsecase = new GetSingleQuizUsecase(
  QuizRepository
);
export const deleteQuizUsecase = new DeleteUserQuizUsecase(QuizRepository);
