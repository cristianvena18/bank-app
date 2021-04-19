import { LogLevels } from "../../Enums/LogLevels";

export interface LoggerService {
  log(level: LogLevels, message: string): void;

  error(error: Error): void;

  report(level: LogLevels, message: string): void;

  info(message: string): void;
}
