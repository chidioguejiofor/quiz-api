import { authAPI } from "domains/auth/apis";
import { Router } from "express";
import { QuizController } from "./controllers";
import { QuestionController } from "./controllers/QuestionController";
const router = Router();

router.post("/quiz", authAPI.tokenMiddleware(), QuizController.createQuiz);

router.get(
  "/user/quiz/:quizId/questions",
  authAPI.tokenMiddleware(),
  QuestionController.retrieveQuestions
);

router.get(
  "/published/quiz/:permalink/questions",
  QuestionController.fetchByPermalink
);

// router.post("/quiz/:permalink/submit", QuestionController.fetchByPermalink);

router.post(
  "/quiz/questions",
  authAPI.tokenMiddleware(),
  QuestionController.addQuestionToQuiz
);

router.put(
  "/quiz/questions/:questionId",
  authAPI.tokenMiddleware(),
  QuestionController.updateQuestion
);

router.delete(
  "/quiz/questions/:questionId",
  authAPI.tokenMiddleware(),
  QuestionController.deleteQuestion
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

router.put(
  "/quiz/:quizId",
  authAPI.tokenMiddleware(),
  QuizController.updateQuiz
);

router.post(
  "/quiz/:quizId/publish",
  authAPI.tokenMiddleware(),
  QuizController.publishQuiz
);
router.delete(
  "/quiz/:quizId",
  authAPI.tokenMiddleware(),
  QuizController.deleteQuiz
);

export default router;
