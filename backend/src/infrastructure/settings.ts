import "dotenv/config";
import dbConfig from "./db/config";

const DATABASE_CONFIG = {
  ...dbConfig,
};

type DATABASE_ENVS = keyof typeof DATABASE_CONFIG;
const APP_ENV = (process.env.NODE_ENV as DATABASE_ENVS) || "development";

export const SEQUELIZE_CONFIG = DATABASE_CONFIG[APP_ENV];
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "*";

export const JWT_TOKEN_SETTINGS = {
  jwtTokenSecret: process.env.JWT_TOKEN_SECRET as string,
  accessTokenDuration: +(
    process.env.ACCESS_TOKEN_EXP_TIME_IN_SECONDS || 5 * 60
  ),
  refreshTokenDuration: +(
    process.env.REFRESH_TOKEN_EXPIRY_TIME || 365.25 * 24 * 60 * 60
  ),
};
