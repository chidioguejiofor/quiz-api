import { Router } from "express";
import { AuthController } from "./controllers/index";
const router = Router();

router.post("/hello", AuthController.hello);

export default router;
