import { NextFunction, Request, Response } from "express";
import { InvalidInputData } from "shared/errors";
import { AppLogger } from "shared/logger";
import { AuthRequest } from "shared/types";
import { handleUnknownError } from "shared/utils/errorHandlers";
import {
  BaseAuthError,
  InvalidSession,
  MustBeLoggedIn,
  SessionExpired,
  UserExists,
  UserNotFound,
} from "../errors";
import { RefreshTokenInput } from "../types";
import {
  loginUsecase,
  refreshTokenUsecase,
  registerUsecase,
  tokenVerifyUsecase,
} from "../usecases";

const logger = AppLogger.create("Auth Controller");

type MiddlewareType = "call-next-on-error" | "return-401-on-error";

export class AuthController {
  static tokenMiddleware(action: MiddlewareType = "return-401-on-error") {
    return async function (
      req: AuthRequest,
      res: Response,
      next: NextFunction
    ) {
      const authorization = req.headers.authorization;
      try {
        const decoded = await tokenVerifyUsecase.execute(
          authorization as string
        );
        req.decoded = decoded;

        return next();
      } catch (error) {
        if (error instanceof BaseAuthError && action === "call-next-on-error") {
          return next();
        }
        if (
          error instanceof MustBeLoggedIn ||
          error instanceof InvalidSession
        ) {
          return res.status(401).json({
            messsage: "You must be logged in to access this",
          });
        }
        if (error instanceof SessionExpired) {
          return res.status(401).json({
            message: "Your session has expired please try again",
          });
        }

        return handleUnknownError(res, {
          error,
          logger,
        });
      }
    };
  }

  public static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const response = await loginUsecase.execute(email, password);
      return res.json(response);
    } catch (error) {
      if (error instanceof UserNotFound) {
        logger.warn(`A user with email ${email} could not login`);
        return res.status(404).json({
          message: "Invalid Credentials",
        });
      } else if (error instanceof InvalidInputData) {
        return res.status(400).json({
          message: "Invalid data",
          errors: error.errors,
        });
      }
      console.log(error);

      return handleUnknownError(res, {
        error,
        logger,
      });
    }
  };

  static async register(req: Request, res: Response) {
    try {
      await registerUsecase.execute({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(200).json({
        message: "Registered successfully",
      });
    } catch (error) {
      if (error instanceof InvalidInputData) {
        const { errors } = error;
        return res.status(400).json({ message: "Invalid input", errors });
      }
      if (error instanceof UserExists) {
        logger.warn("We are trying to register a user with an existing email.");
        return res
          .status(409)
          .json({ message: `User with email ${req.body.email} exists` });
      }

      return handleUnknownError(res, {
        error,
        logger,
      });
    }
  }

  public static async refreshToken(
    req: Request<unknown, unknown, RefreshTokenInput>,
    res: Response
  ) {
    const { accessToken, refreshToken } = req.body;
    try {
      const newAccessToken = await refreshTokenUsecase.execute(
        accessToken || "",
        refreshToken || ""
      );
      return res.status(201).json({
        accessToken: newAccessToken,
      });
    } catch (error) {
      if (error instanceof InvalidInputData) {
        return res.status(400).json({
          message: "Invalid input",
        });
      }

      if (error instanceof InvalidSession) {
        return res.status(400).json({
          message: "Invalid tokens",
        });
      }

      if (error instanceof SessionExpired) {
        return res.status(403).json({
          message: "Expired session. Please login again",
        });
      }

      return handleUnknownError(res, {
        error,
        logger,
      });
    }
  }
}
