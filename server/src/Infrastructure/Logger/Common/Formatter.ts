import { format } from 'winston';
import path from 'path';
const packageInfo = require(path.join(process.cwd(), 'package.json'));

export class Formatter {
  static tryParse = function (message: string) {
    try {
      return JSON.parse(message);
    } catch {
      return { message }
    }
  }
  public static format() {
    return format.printf((info: any) => {
      const date = new Date().toISOString();
      const masked = JSON.stringify({
        ...Formatter.tryParse(info.message),
        name: 'Log',
        level: info.level,
        source: {
          name: packageInfo.name,
          version: packageInfo.version,
        },
        timestamp: date
      }, undefined, 2);
      return masked;
    });
  }
}