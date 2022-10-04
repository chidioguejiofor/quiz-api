import { Router } from "express";
import { QuizController } from "./controllers";
const router = Router();

router.post("/hello", QuizController.hello);

export default router;
