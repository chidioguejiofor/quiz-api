import { JWT_TOKEN_SETTINGS } from "infrastructure/settings";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { SessionEntity, UserEntity } from "../entities";
import { InvalidSession, SessionExpired } from "../errors";
import { Session } from "../models/session";

export class SessionManager {
  private static JWT_TOKEN_SECRET = JWT_TOKEN_SETTINGS.jwtTokenSecret;
  private static REFRESH_TOKEN_EXPIRY_TIME_IN_SECS =
    JWT_TOKEN_SETTINGS.refreshTokenDuration;
  private static ACCESS_TOKEN_EXP_TIME_IN_SECONDS =
    JWT_TOKEN_SETTINGS.accessTokenDuration;

  static async getSession(sessionId: string): Promise<SessionEntity> {
    const session = await Session.findOne({
      where: {
        id: sessionId,
      },
    });

    if (!session || session.expired) {
      throw new SessionExpired();
    }

    return session;
  }

  static async clearSession(userId: string) {
    Session.destroy({
      where: {
        userId,
      },
    });
  }
  static async createSession(user: UserEntity): Promise<SessionEntity> {
    const now = new Date();
    const expiresAt = new Date(
      +now + this.REFRESH_TOKEN_EXPIRY_TIME_IN_SECS * 1000
    );

    return Session.create({
      email: user.email,
      userId: user.id as string,
      expiresAt: expiresAt,
    });
  }

  private static generateToken(
    data: Record<string, any>,
    expTimeInSec: number
  ) {
    return jwt.sign({ data }, this.JWT_TOKEN_SECRET, {
      expiresIn: expTimeInSec,
    });
  }

  public static verifyToken(token: string) {
    try {
      const { data } = jwt.verify(token, this.JWT_TOKEN_SECRET) as any;
      return data;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new SessionExpired();
      }
      throw new InvalidSession();
    }
  }

  public static decode(token: string) {
    try {
      const { data } = jwt.decode(token) as { data: any };
      return data;
    } catch (error) {
      throw new InvalidSession();
    }
  }

  public static generateAccessToken(sessionId: string, email: string) {
    const accessTokenData = {
      id: sessionId,
      email: email,
    };
    return this.generateToken(
      accessTokenData,
      this.ACCESS_TOKEN_EXP_TIME_IN_SECONDS
    );
  }

  public static generateTokens(session: SessionEntity) {
    const accessTokenData = {
      id: session.id,
      email: session.email,
    };

    const refreshTokenData = {
      id: session.id,
    };

    const accessToken = this.generateToken(
      accessTokenData,
      this.ACCESS_TOKEN_EXP_TIME_IN_SECONDS
    );

    const refreshToken = this.generateToken(
      refreshTokenData,
      this.REFRESH_TOKEN_EXPIRY_TIME_IN_SECS
    );

    return { accessToken, refreshToken };
  }
}

export type SessionManagerType = typeof SessionManager;
