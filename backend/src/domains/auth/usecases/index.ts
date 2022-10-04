import { RegisterUsecase } from "./registerUsecase";
import { AuthRepository, SessionManager } from "../repositories";
import { LoginUsecase } from "./loginUsecase";
import { RefreshTokenUsecase } from "./refreshTokenUsecase";
import { TokenVerifyUsecase } from "./tokenVerifyUsecase";

export const registerUsecase = new RegisterUsecase(AuthRepository);

export const loginUsecase = new LoginUsecase(AuthRepository, SessionManager);

export const refreshTokenUsecase = new RefreshTokenUsecase(SessionManager);

export const tokenVerifyUsecase = new TokenVerifyUsecase(SessionManager);
