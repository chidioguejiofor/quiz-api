import { validateSchema } from "shared/utils/validation";
import { AuthRepositoryType, SessionManagerType } from "../repositories";
import { loginInputValidatorSchema } from "../validators";

export class LoginUsecase {
  constructor(
    private authRepository: AuthRepositoryType,
    private sessionManager: SessionManagerType
  ) {}

  async execute(email: string, password: string) {
    const cleanEmail = this.cleanEmail(email);
    validateSchema({ email: cleanEmail, password }, loginInputValidatorSchema);

    const user = await this.authRepository.getUserWithCredentials(
      cleanEmail,
      password
    );

    const session = await this.sessionManager.createSession(user);

    const { accessToken, refreshToken } =
      await this.sessionManager.generateTokens(session);

    return {
      accessToken,
      refreshToken,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        sessionId: session.id,
      },
    };
  }

  cleanEmail(email?: string) {
    return email?.trim().toLowerCase() as string;
  }
}
