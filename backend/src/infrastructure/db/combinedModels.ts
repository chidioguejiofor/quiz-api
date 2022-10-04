import { User, Session } from "domains/auth/models";
import { Quiz, Question, Option } from "domains/quiz/models";

export const combinedModels = [User, Session, Quiz, Question, Option];

export default combinedModels;
