import { QuizRepository } from "../repositories/QuizRepository";
import { CreateQuestionUsecase } from "./CreateQuestionUsecase";
import { CreateQuizUsecase } from "./CreateQuizUsecase";
import { DeleteQuestionUsecase } from "./DeleteQuestionUsecase";
import { DeleteUserQuizUsecase } from "./DeleteUserQuizUsecase";
import { GetQuestionUsecase } from "./GetQuestionUsecase";
import { GetSingleQuizUsecase } from "./GetSingleQuizUsecase";
import { GetUserQuizUsecase } from "./GetUserQuizUsecase";
import { PublishQuizUsecase } from "./PublishQuizUsecase";
import { UpdateQuestionUsecase } from "./UpdateQuestionUsecase";
import { UpdateQuizUsecase } from "./UpdateQuizUsecase";

export const createQuestionUsecase = new CreateQuestionUsecase(QuizRepository);
export const updateQuestionUsecase = new UpdateQuestionUsecase(QuizRepository);
export const deleteQuestionUsecase = new DeleteQuestionUsecase(QuizRepository);
export const getQuestionUsecase = new GetQuestionUsecase(QuizRepository);

export const createQuizUsecase = new CreateQuizUsecase(QuizRepository);
export const retrieveQuizUsecase = new GetUserQuizUsecase(QuizRepository);
export const retrieveSingleQuizUsecase = new GetSingleQuizUsecase(
  QuizRepository
);
export const updateQuizUsecase = new UpdateQuizUsecase(QuizRepository);
export const deleteQuizUsecase = new DeleteUserQuizUsecase(QuizRepository);
export const publishQuizUsecase = new PublishQuizUsecase(QuizRepository);
