import { AppLogger } from "shared/logger";
import app from "./infrastructure/app";

const logger = AppLogger.create("App");
const PORT = process.env.PORT || 4242;

app.listen(PORT, () => logger.info("Running on port " + PORT));
