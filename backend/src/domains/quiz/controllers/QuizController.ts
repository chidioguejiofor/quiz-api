import { Request, Response } from "express";
import { AppLogger } from "shared/logger";

const logger = AppLogger.create("Quiz Controller");

export class QuizController {
  public static hello(req: Request, res: Response) {
    logger.info("hello from quiz");
    return res.status(200).json({ message: "Hello we are here" });
  }
}
