import { Response } from "express";
import { InvalidInputData } from "shared/errors";
import { AppLogger } from "shared/logger";
import { AuthRequest } from "shared/types";
import { handleUnknownError } from "shared/utils/errorHandlers";
import { QuizNotFound } from "../errors";
import {
  createQuizUsecase,
  deleteQuizUsecase,
  retrieveQuizUsecase,
} from "../usecases/index";

const logger = AppLogger.create("Quiz Controller");

export class QuizController {
  public static async createQuiz(req: AuthRequest, res: Response) {
    const quiz = {
      title: req.body.title,
      imageURL: req.body.imageURL,
    };
    const userId = req.decoded?.userId as string;

    try {
      const data = await createQuizUsecase.execute(userId, quiz);

      return res.status(201).json({
        message: "Succesfully create quiz",
        data,
      });
    } catch (error) {
      if (error instanceof InvalidInputData) {
        return res.status(400).json({
          message: "Invalid inputs were specified",
          errors: error.errors,
        });
      }

      return handleUnknownError(res, {
        error,
        logger,
      });
    }
  }
  public static async retrieveQuiz(req: AuthRequest, res: Response) {
    logger.info("Retrieving Quiz...");

    const userId = req.decoded?.userId as string;

    try {
      const data = await retrieveQuizUsecase.execute(userId);

      return res.status(200).json({
        message: "Succesfully retrieved user quiz",
        data,
      });
    } catch (error) {
      if (error instanceof InvalidInputData) {
        return res.status(400).json({
          message: "Invalid inputs were specified",
          errors: error.errors,
        });
      }

      return handleUnknownError(res, {
        error,
        logger,
      });
    }
  }

  public static async deleteQuiz(req: AuthRequest, res: Response) {
    logger.info("hello from quiz");
    try {
      const userId = req.decoded?.userId as string;
      const quizId = req.params.quizId as string;

      const data = await deleteQuizUsecase.execute(userId, quizId);

      return res.status(200).json({
        message: "Succesfully deleted quiz",
        data,
      });
    } catch (error) {
      if (error instanceof InvalidInputData) {
        return res.status(400).json({
          message: "Invalid inputs were specified",
          errors: error.errors,
        });
      }

      if (error instanceof QuizNotFound) {
        return res.status(404).json({
          message: "Quiz was not found",
          errors: error.errors,
        });
      }

      return handleUnknownError(res, {
        error,
        logger,
      });
    }
  }
}
