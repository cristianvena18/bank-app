import { inject, injectable } from "inversify";
import { LoggerService } from "../../../Domain/Interfaces/Services/LoggerService";
import { createLogger, format, Logger, transports } from "winston";
import { LogLevels } from "../../../Domain/Enums/LogLevels";
import { parse } from 'stack-trace';
import { Formatter } from '../Common/Formatter';
import DailyRotateFile from "winston-daily-rotate-file";
import { Masker } from '../Common/Masker';
import { ReporterService } from '../../../Domain/Interfaces/Services/ReporterService';
import { INTERFACES } from "../../DI/interfaces.types";

/**
 * A simple logger that allow multiple transports
 */
@injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: Logger;

  public constructor(@inject(INTERFACES.ReporterService) private reporter: ReporterService) {
    this.logger = createLogger({
      format: format.combine(
        Masker.format(),
        Formatter.format(),
      ),
      defaultMeta: {},
      transports: [
        //
        // - Write to all loggers with level `info` and below to `combined.logger`
        // - Write all loggers error (and below) to `error.logger`.
        //
        //        new transports.File({ filename: "logs/error.log", level: "error" }),
        //        new transports.File({ filename: "logs/info.log" }),
        //  new ElasticsearchTransport({ level: 'info', clientOpts: { node: process.env.ELASTIC_URL } }),
        new DailyRotateFile({
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          filename: 'logs/%DATE%-error.log',
        }),
        new DailyRotateFile({
          datePattern: 'YYYY-MM-DD',
          filename: 'logs/%DATE%-logs.log',
        }),
      ],
    });

    //
    // If we're not in production then logger to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new transports.Console({
          format: format.printf((info): string => `${info.level} ${JSON.parse(JSON.stringify(info.message, undefined, 2))}`),
        })
      );
    }
  }
  getStream(): any {
    const context = this;
    return {
      write(message: string) {
        context.info(message);
      }
    }
  }

  info(message: string): void {
    this.logger.info(message);
  }

  public log(level: LogLevels, message: string): void {
    this.logger.log(level, message);
  }

  public error(error: Error): void {
    this.logger.error({ ...error, message: error.message, stack: parse(error)[0] });
  }

  public report(level: LogLevels, message: string): void {
    this.reporter.report(level, message);
  }
}
