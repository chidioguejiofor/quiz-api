import { Application, Router } from "express";
import cors from "cors";
import { authRoutes } from "../domains/auth";
import { ALLOWED_ORIGINS } from "./settings";

export default function combinedRoutes(app: Application): void {
  const routes = Router();
  routes.use(cors({ origin: ALLOWED_ORIGINS }));

  routes.use("/auth", authRoutes);

  app.use("/api", routes);
}
