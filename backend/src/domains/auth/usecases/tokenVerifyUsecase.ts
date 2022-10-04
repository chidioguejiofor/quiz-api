import { MustBeLoggedIn } from "../errors";
import { SessionManagerType } from "../repositories";

export class TokenVerifyUsecase {
  private sessionManager: SessionManagerType;

  constructor(sessionManager: SessionManagerType) {
    this.sessionManager = sessionManager;
  }
  async execute(authorization?: string) {
    authorization = authorization || "";
    const accessToken = this.getAccessToken(authorization);

    const { id: sessionId } = await this.sessionManager.verifyToken(
      accessToken
    );
    const session = await this.sessionManager.getSession(sessionId);

    return {
      userEmail: session.email,
      userId: session.userId,
    };
  }

  private getAccessToken(authorization: string) {
    const authorizationParts = authorization?.trim().split(" ");

    if (authorizationParts.length != 2) {
      throw new MustBeLoggedIn();
    }

    if (authorizationParts[0].toLowerCase() !== "bearer") {
      throw new MustBeLoggedIn();
    }

    return authorizationParts[1];
  }
}
