import { Response } from "express";
import { InvalidInputData } from "shared/errors";
import { AppLogger } from "shared/logger";
import { AuthRequest } from "shared/types";
import { handleUnknownError } from "shared/utils/errorHandlers";
import {
  CannotEditPublishedQuiz,
  QuestionNotFound,
  QuizNotFound,
} from "../errors";
import {
  createQuestionUsecase,
  createQuizUsecase,
  deleteQuestionUsecase,
  deleteQuizUsecase,
  getQuestionUsecase,
  retrieveQuizUsecase,
  retrieveSingleQuizUsecase,
  updateQuestionUsecase,
  updateQuizUsecase,
} from "../usecases";

const logger = AppLogger.create("Quiz Controller");

export class QuizController {
  private static handleQuestionErrors(res: Response, error: unknown) {
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

    if (error instanceof QuestionNotFound) {
      return res.status(404).json({
        message: "Question does not exist in specified quiz",
        errors: error.errors,
      });
    }

    return handleUnknownError(res, {
      error,
      logger,
    });
  }
  public static async updateQuestion(req: AuthRequest, res: Response) {
    const question = {
      title: req.body.title,
      imageURL: req.body.imageURL,
      options: req.body.options,
      quizId: req.body.quizId,
    };
    const questionId = req.params.questionId as string;
    const userId = req.decoded?.userId as string;

    try {
      const data = await updateQuestionUsecase.execute(
        userId,
        question,
        questionId
      );

      return res.status(201).json({
        message: "Succesfully updated question",
        data,
      });
    } catch (error) {
      return QuizController.handleQuestionErrors(res, error);
    }
  }

  public static async deleteQuestion(req: AuthRequest, res: Response) {
    const questionId = req.params.questionId as string;
    const userId = req.decoded?.userId as string;

    try {
      const data = await deleteQuestionUsecase.execute(
        userId,
        questionId,
        req.body.quizId as string
      );

      return res.status(200).json({
        message: "Succesfully deleted question",
        data,
      });
    } catch (error) {
      return QuizController.handleQuestionErrors(res, error);
    }
  }

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
        message: "Succesfully added a question to the quiz",
        data,
      });
    } catch (error) {
      return QuizController.handleQuestionErrors(res, error);
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
