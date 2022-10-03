import "dotenv/config";
import dbConfig from "./db/config";

const DATABASE_CONFIG = {
  ...dbConfig,
};

type DATABASE_ENVS = keyof typeof DATABASE_CONFIG;
const APP_ENV = (process.env.NODE_ENV as DATABASE_ENVS) || "development";

export const SEQUELIZE_CONFIG = DATABASE_CONFIG[APP_ENV];
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "*";
