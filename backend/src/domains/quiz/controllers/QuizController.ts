import { Response } from "express";
import { InvalidInputData } from "shared/errors";
import { AppLogger } from "shared/logger";
import { AuthRequest } from "shared/types";
import { handleUnknownError } from "shared/utils/errorHandlers";
import { CannotEditPublishedQuiz, QuizNotFound } from "../errors";
import {
  createQuestionUsecase,
  createQuizUsecase,
  deleteQuizUsecase,
  getQuestionUsecase,
  retrieveQuizUsecase,
} from "../usecases/index";

const logger = AppLogger.create("Quiz Controller");

export class QuizController {
  public static async addQuestionToQuiz(req: AuthRequest, res: Response) {
    const question = {
      title: req.body.title,
      imageURL: req.body.imageURL,
      options: req.body.options,
      quizId: req.body.quizId,
    };
    const userId = req.decoded?.userId as string;

    try {
      const data = await createQuestionUsecase.execute(userId, question);

      return res.status(201).json({
        message: "Succesfully created quiz",
        data,
      });
    } catch (error) {
      if (error instanceof InvalidInputData) {
        return res.status(400).json({
          message: "Invalid inputs were specified",
          errors: error.errors,
        });
      }

      if (error instanceof CannotEditPublishedQuiz) {
        return res.status(400).json({
          message: "You cannot add questions to a published quiz",
          errors: error.errors,
        });
      }

      if (error instanceof QuizNotFound) {
        return res.status(404).json({
          message: "Quiz does not exist",
          errors: error.errors,
        });
      }

      return handleUnknownError(res, {
        error,
        logger,
      });
    }
  }

  public static async retrieveQuestions(req: AuthRequest, res: Response) {
    const userId = req.decoded?.userId as string;
    const quizId = req.params.quizId as string;

    try {
      const data = await getQuestionUsecase.execute(userId, quizId);

      return res.status(200).json({
        message: "Successfully retrieved questions for quiz",
        data,
      });
    } catch (error) {
      if (error instanceof InvalidInputData) {
        return res.status(400).json({
          message: "Invalid inputs were specified",
          errors: error.errors,
        });
      }

      if (error instanceof CannotEditPublishedQuiz) {
        return res.status(400).json({
          message: "You cannot add questions to a published quiz",
          errors: error.errors,
        });
      }

      if (error instanceof QuizNotFound) {
        return res.status(404).json({
          message: "Quiz does not exist",
          errors: error.errors,
        });
      }

      return handleUnknownError(res, {
        error,
        logger,
      });
    }
  }

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
