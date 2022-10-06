import { Response } from "express";
import { InvalidInputData } from "shared/errors";
import { AppLogger } from "shared/logger";
import { AuthRequest } from "shared/types";
import { handleUnknownError } from "shared/utils/errorHandlers";
import {
  NotEnoughQuestionsInQuiz,
  QuizAlreadyPublished,
  QuizNotFound,
} from "../errors";
import {
  createQuizUsecase,
  deleteQuizUsecase,
  publishQuizUsecase,
  retrieveQuizUsecase,
  retrieveSingleQuizUsecase,
  updateQuizUsecase,
} from "../usecases";

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
        message: "Succesfully created quiz",
        data,
      });
    } catch (error) {
      return QuizController.handleErrors(error, res);
    }
  }

  public static async publishQuiz(req: AuthRequest, res: Response) {
    const userId = req.decoded?.userId as string;
    const quizId = req.params?.quizId as string;

    try {
      const data = await publishQuizUsecase.execute(userId, quizId);

      return res.status(201).json({
        message: "Succesfully published quiz",
        data,
      });
    } catch (error) {
      return QuizController.handleErrors(error, res);
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
      return QuizController.handleErrors(error, res);
    }
  }

  public static async getSingleQuiz(req: AuthRequest, res: Response) {
    const quizId = req.params.quizId;
    const userId = req.decoded?.userId as string;

    logger.info("Retrieving single Quiz...", { quizId, userId });

    try {
      const data = await retrieveSingleQuizUsecase.execute(userId, quizId);

      return res.status(200).json({
        message: "Succesfully retrieved quiz",
        data,
      });
    } catch (error) {
      return QuizController.handleErrors(error, res);
    }
  }

  public static async updateQuiz(req: AuthRequest, res: Response) {
    const quizId = req.params.quizId;
    const userId = req.decoded?.userId as string;

    const quiz = {
      title: req.body.title,
      imageURL: req.body.imageURL,
    };
    logger.info("Updating Quiz...", { quizId, userId, newQuiz: quiz });

    try {
      const data = await updateQuizUsecase.execute(userId, quizId, quiz);

      return res.status(200).json({
        message: "Succesfully updated quiz",
        data,
      });
    } catch (error) {
      return QuizController.handleErrors(error, res);
    }
  }

  public static async deleteQuiz(req: AuthRequest, res: Response) {
    logger.info("Deleting quiz...");
    try {
      const userId = req.decoded?.userId as string;
      const quizId = req.params.quizId as string;

      const data = await deleteQuizUsecase.execute(userId, quizId);

      return res.status(200).json({
        message: "Succesfully deleted quiz",
        data,
      });
    } catch (error) {
      return QuizController.handleErrors(error, res);
    }
  }
  private static handleErrors(error: unknown, res: Response) {
    if (error instanceof InvalidInputData) {
      return res.status(400).json({
        message: "Invalid inputs were specified",
        errors: error.errors,
      });
    }

    if (error instanceof QuizNotFound) {
      return res.status(404).json({
        message: "Quiz you specified was not found",
        errors: error.errors,
      });
    }

    if (error instanceof QuizAlreadyPublished) {
      return res.status(409).json({
        message: "You cannot publish an already published quiz. Only delete",
        errors: error.errors,
      });
    }

    if (error instanceof NotEnoughQuestionsInQuiz) {
      return res.status(400).json({
        message: "You need at least 2 questions in order to publish a quiz",
        errors: error.errors,
      });
    }
    return handleUnknownError(res, {
      error,
      logger,
    });
  }
}
