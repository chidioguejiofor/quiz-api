import { Response } from "express";
import { AppLogger } from "shared/logger";

const DEFAULT_ERROR_MSG = "An error occured while processing requests";

type UnknownErrorArgument = {
  error: unknown;
  logger: AppLogger;
  loggerMsg?: string;
};

export const handleUnknownError = (
  res: Response,
  args: UnknownErrorArgument
) => {
  const { error, logger, loggerMsg: msg = DEFAULT_ERROR_MSG } = args;
  logger.error(`${msg} ${error}`, { error });
  res.status(500).json({
    message:
      "An error occured while processing your request. Please contact support",
  });
};
