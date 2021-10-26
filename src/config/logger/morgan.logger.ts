import { INestApplication, Logger } from '@nestjs/common';
import * as morgan from 'morgan';

export class MorganLogger {
  static setupMorgan(app: INestApplication): void {
    const httpRequestLogger: Logger = new Logger('HTTPRequest');
    app.use(
      morgan(
        ':remote-addr :remote-user [:date[iso]] ":method :url HTTP/:http-version" ' +
          ':status :res[content-length] :response-time ms ":referrer" ":user-agent"',
        {
          stream: { write: (str: string) => httpRequestLogger.log(str) },
        },
      ),
    );
  }
}
