import { validateSchema } from "shared/utils/validation";
import { InvalidSession } from "../errors";
import { SessionManagerType } from "../repositories";
import { refreshTokenSchema } from "../validators";

export class RefreshTokenUsecase {
  constructor(private sessionManager: SessionManagerType) {}
  async execute(accessToken: string, refreshToken: string) {
    validateSchema({ accessToken, refreshToken }, refreshTokenSchema);

    const session = await this.getSession(refreshToken, accessToken);

    return this.sessionManager.generateAccessToken(
      session.id as string,
      session.email
    );
  }

  private async getSession(refreshToken: string, accessToken: string) {
    const { id: refreshId } = await this.sessionManager.verifyToken(
      refreshToken as string
    );

    const { id: accessSessionId } = await this.sessionManager.decode(
      accessToken as string
    );

    if (accessSessionId !== refreshId) {
      throw new InvalidSession();
    }

    const session = await this.sessionManager.getSession(refreshId);
    return session;
  }
}
