import { Request, Response } from "express";
import { AppLogger } from "shared/logger";

const logger = AppLogger.createLogger("Auth Controller");

export class AuthController {
  static hello(req: Request, res: Response) {
    logger.info("hello from authentication");
    return res.status(200).json({ message: "Hello we are here" });
  }
}
