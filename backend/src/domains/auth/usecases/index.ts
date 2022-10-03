import { RegisterUsecase } from "./registerUsecase";
import { AuthRepository, SessionManager } from "../repositories";
import { LoginUsecase } from "./loginUsecase";

export const registerUsecase = new RegisterUsecase(AuthRepository);

export const loginUsecase = new LoginUsecase(AuthRepository, SessionManager);
