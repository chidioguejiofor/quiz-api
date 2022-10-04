import { authAPI } from "domains/auth/apis";
import { Router } from "express";
import { QuizController } from "./controllers";
const router = Router();

router.post("/quiz", authAPI.tokenMiddleware(), QuizController.createQuiz);
router.get(
  "/user/quiz",
  authAPI.tokenMiddleware(),
  QuizController.retrieveQuiz
);
router.delete(
  "/quiz/:quizId",
  authAPI.tokenMiddleware(),
  QuizController.deleteQuiz
);

export default router;
