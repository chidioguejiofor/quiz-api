import winston from "winston";

const { createLogger: _createLogger, format, transports } = winston;

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const globalLogger = _createLogger({
  levels: logLevels,
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint(),
    format.errors({ stack: true })
  ),
  transports: [new transports.Console({ handleExceptions: true })],
  silent: process.env.NODE_ENV === "test",
});

export class AppLogger {
  private serviceName: string;
  private constructor(name: string) {
    this.serviceName = name;
  }

  public static create(moduleName: string) {
    const logger = new AppLogger(moduleName);
    return logger;
  }
  public info(msg: string, extra?: Record<string, unknown>) {
    globalLogger.info(msg, {
      ...extra,
      service: this.serviceName,
    });
  }

  public error(msg: any, extra?: Record<string, unknown>) {
    globalLogger.error(msg, {
      ...extra,
      service: this.serviceName,
    });
  }

  public warn(msg: string, extra?: Record<string, unknown>) {
    globalLogger.error(msg, {
      service: this.serviceName,
      ...extra,
    });
  }

  public debug(msg: string, extra?: Record<string, unknown>) {
    globalLogger.debug(msg, {
      service: this.serviceName,
      ...extra,
    });
  }
}
