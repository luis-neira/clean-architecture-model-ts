import 'make-promises-safe';

import { DatabaseClient } from './infrastructure/database/orm';
import WebAppFactory from './infrastructure/web/web-app.factory';
import HttpServer from './infrastructure/web/server';

class App {
  public static async main(): Promise<void> {
    const databaseClient = DatabaseClient.getInstance();

    await databaseClient.connect();

    const webAppFactory = new WebAppFactory();

    const expressApp = webAppFactory.getExpressApp();

    const server = new HttpServer(expressApp.build());

    server.configure();

    server.listen(process.env.PORT || 3000);
  }
}

App.main().catch(console.error);
