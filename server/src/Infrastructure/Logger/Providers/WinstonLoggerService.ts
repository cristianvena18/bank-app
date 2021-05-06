import { inject, injectable } from "inversify";
import { LoggerService } from "../../../Domain/Interfaces/Services/LoggerService";
import { createLogger, format, Logger, transports } from "winston";
import { LogLevels } from "../../../Domain/Enums/LogLevels";
import LogStash from 'winston3-logstash-transport'

/**
 * A simple logger that allow multiple transports
 */
@injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: Logger;

  private readonly logFormatCommon = format.printf(function (info): any {
    const date = new Date().toISOString();
    return {
      name: 'Log',
      level: info.level,
      message: info.message,
    };
  });

  public constructor() {
    this.logger = createLogger({
      format: this.logFormatCommon,
      defaultMeta: { service: "user-service" },
      transports: [
        //
        // - Write to all loggers with level `info` and below to `combined.logger`
        // - Write all loggers error (and below) to `error.logger`.
        //
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/info.log" }),
        new LogStash({mode: 'udp', host: 'logstash', port: '5000'})
      ],
    });

    //
    // If we're not in production then logger to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new transports.Console({
          format: this.logFormatCommon,
        })
      );
    }
  }

  info(message: string): void {
    this.logger.info(message);
  }

  public log(level: LogLevels, message: string): void {
    this.logger.log(level, message);
  }

  public error(error: Error): void {
    this.logger.error(error);
  }

  public report(level: LogLevels, message: string): void {
    //TODO: implement better reporter for your application.
    this.log(level, message);
  }
}
