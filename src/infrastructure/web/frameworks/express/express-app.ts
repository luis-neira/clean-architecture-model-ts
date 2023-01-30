import express, { Express } from 'express';
import pinoHttp from './middlewares/vendors/pino-http';

import errorHandler from './middlewares/error-handler';
import errorLogger from './middlewares/error-logger';
import notFoundHandler from './middlewares/not-found-handler';
import mikroOrmRequestContext from './middlewares/vendors/mikroorm-request-context';

import { RouterMaker } from './routers/interfaces';

export default class ExpressApp {
  private _app: Express;
  private _routerMaker: RouterMaker;
  private _options: {} | undefined;
  private _appInitialized: boolean = false;

  public constructor(routerMaker: RouterMaker, options?: {}) {
    this._app = express();
    this._routerMaker = routerMaker;
    this._options = options;
  }

  public build(): Express {
    this.initApp();
    return this._app;
  }

  private initApp(): void {
    if (this._appInitialized === false) {
      this.setAppSettings();
      this.setMiddleWare();
      this.setAppRouter();
      this.setErrorHanders();

      this._appInitialized = true;
    }
  }

  private setAppSettings(): void {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }

  private setMiddleWare(): void {
    this._app.use(pinoHttp);
    this._app.use(mikroOrmRequestContext);
  }

  private setAppRouter(): void {
    this._app.use('/api/v1', this._routerMaker.getRouter());
  }

  private setErrorHanders(): void {
    this._app.use(notFoundHandler);
    this._app.use(errorLogger);
    this._app.use(errorHandler);
  }
}
