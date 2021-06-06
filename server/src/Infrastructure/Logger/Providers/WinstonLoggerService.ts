import { inject, injectable } from "inversify";
import { LoggerService } from "../../../Domain/Interfaces/Services/LoggerService";
import winston, { createLogger, format, Logger, transports } from "winston";
import { LogLevels } from "../../../Domain/Enums/LogLevels";
import LogStash from 'winston3-logstash-transport'
import { parse } from "stack-trace";
import path from 'path';
import { ElasticsearchTransport } from "winston-elasticsearch";
const packageInfo = require(path.join(process.cwd(), 'package.json'));

/**
 * A simple logger that allow multiple transports
 */
@injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: Logger;

  private readonly logFormatCommon = format.printf(function (info): any {
    const date = new Date().toISOString();
    return JSON.stringify({
      name: 'Log',
      level: info.level,
      message: info,
      version: packageInfo.version,
      timestamp: date
    }, undefined, 2);
  });

  public constructor() {
    this.logger = createLogger({
      format: this.logFormatCommon,
      defaultMeta: { version: packageInfo.version, service: packageInfo.name },
      transports: [
        //
        // - Write to all loggers with level `info` and below to `combined.logger`
        // - Write all loggers error (and below) to `error.logger`.
        //
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/info.log" }),
        //  new ElasticsearchTransport({ level: 'info', clientOpts: { node: process.env.ELASTIC_URL } }),
        new LogStash({ mode: 'udp', host: '127.0.0.1', port: '28777' })
      ],
    });

    //
    // If we're not in production then logger to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new transports.Console({
          format: format.printf((info): string => `${info.level} ${info.message}`),
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
    this.logger.error({ ...error, message: error.message, stack: parse(error)[0] });
  }

  public report(level: LogLevels, message: string): void {
    //TODO: implement better reporter for your application.
    this.log(level, message);
  }
}
