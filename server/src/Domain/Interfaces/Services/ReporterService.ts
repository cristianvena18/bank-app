import { LogLevels } from "../../Enums/LogLevels";

export interface ReporterService {
  report(logLevel: LogLevels, info: any): void;
}
