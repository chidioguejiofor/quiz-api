import { QuizRepository } from "../repositories/QuizRepository";
import { CreateQuestionUsecase } from "./CreateQuestionUsecase";
import { CreateQuizUsecase } from "./CreateQuizUsecase";
import { DeleteUserQuizUsecase } from "./DeleteUserQuizUsecase";
import { GetQuestionUsecase } from "./GetQuestionUsecase";
import { GetUserQuizUsecase } from "./GetUserQuizUsecase";

export const createQuestionUsecase = new CreateQuestionUsecase(QuizRepository);
export const getQuestionUsecase = new GetQuestionUsecase(QuizRepository);
export const createQuizUsecase = new CreateQuizUsecase(QuizRepository);
export const retrieveQuizUsecase = new GetUserQuizUsecase(QuizRepository);
export const deleteQuizUsecase = new DeleteUserQuizUsecase(QuizRepository);
