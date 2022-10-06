import { authAPI } from "domains/auth/apis";
import { Router } from "express";
import { QuizController } from "./controllers";
const router = Router();

router.post("/quiz", authAPI.tokenMiddleware(), QuizController.createQuiz);

router.get(
  "/user/quiz/:quizId/questions",
  authAPI.tokenMiddleware(),
  QuizController.retrieveQuestions
);

router.post(
  "/quiz/questions",
  authAPI.tokenMiddleware(),
  QuizController.addQuestionToQuiz
);

router.put(
  "/quiz/questions/:questionId",
  authAPI.tokenMiddleware(),
  QuizController.updateQuestion
);

router.delete(
  "/quiz/questions/:questionId",
  authAPI.tokenMiddleware(),
  QuizController.deleteQuestion
);

router.get(
  "/user/quiz",
  authAPI.tokenMiddleware(),
  QuizController.retrieveQuiz
);

router.get(
  "/quiz/:quizId",
  authAPI.tokenMiddleware(),
  QuizController.getSingleQuiz
);
router.delete(
  "/quiz/:quizId",
  authAPI.tokenMiddleware(),
  QuizController.deleteQuiz
);

export default router;
