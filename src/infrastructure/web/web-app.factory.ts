import ExpressApp from './frameworks/express';

import MainRouter from './frameworks/express/routers';

export default class WebAppConfig {
  public constructor() {}

  public getExpressApp(options?: {}): ExpressApp {
    return new ExpressApp(new MainRouter(), options);
  }
}
