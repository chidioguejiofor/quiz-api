import { AuthController } from "./controllers";
import { AuthRepository } from "./repositories";

export const authAPI = {
  tokenMiddleware: AuthController.tokenMiddleware,
  getUserById: AuthRepository.getUserById,
};

export type AuthAPIType = typeof authAPI;
