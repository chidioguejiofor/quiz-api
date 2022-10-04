import { authAPI } from "domains/auth/apis";
import { QuizRepository } from "../repositories/QuizRepository";
import { CreateQuizUsecase } from "./CreateQuizUsecase";
import { DeleteUserQuizUsecase } from "./DeleteUserQuizUsecase";
import { GetUserQuizUsecase } from "./GetUserQuizUsecase";

export const createQuizUsecase = new CreateQuizUsecase(authAPI, QuizRepository);
export const retrieveQuizUsecase = new GetUserQuizUsecase(QuizRepository);
export const deleteQuizUsecase = new DeleteUserQuizUsecase(QuizRepository);
