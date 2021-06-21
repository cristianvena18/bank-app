import { ReporterService } from '../../../Domain/Interfaces/Services/ReporterService';
import { LogLevels } from '../../../Domain/Enums/LogLevels';
import { createLogger, Logger } from 'winston';
import { injectable } from 'inversify';
import { format } from 'winston';
import { Masker } from '../Common/Masker';
import { Formatter } from '../Common/Formatter';
const SlackHook = require('winston-slack-webhook-transport');

@injectable()
class SlackReporter implements ReporterService {
  private reporter: Logger;

  public constructor() {
    if (process.env.SLACK_WEBHOOK && process.env.REPORT_ERRORS == 'true') {
      // @ts-ignore
      this.reporter = createLogger({
        format: format.combine(Masker.format(), Formatter.format()),
        defaultMeta: { service: 'user-service' },
        transports: [
          // @ts-ignore
          new SlackHook({
            webhookUrl: process.env.SLACK_WEBHOOK,
            formatter: this.logFormatSlack,
          }),
        ],
      });
    }
  }

  public report(level: LogLevels, message: string): void {
    if (this.reporter) {
      this.reporter.log(level, message);
    }
  }

  private readonly logFormatSlack = (info: any): any => {
    const date = new Date().toISOString();
    let body = '';
    try {
      const parsedInfo = JSON.parse(JSON.stringify(info));
      body = `\`\`\` ${JSON.stringify(parsedInfo, null, 2)} \`\`\``;
    } catch {
      body = `\`\`\` ${info} \`\`\``;
    }
    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: `Log object at ${date}, ${info.level}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: body,
          },
        },
      ],
    };
  };
}

export default SlackReporter;
