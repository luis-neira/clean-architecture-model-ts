import { Server } from 'http';
import { AddressInfo } from 'net';

import { Express } from 'express';

import ServerConfig from './server-config';
import logger from '@common/logger';

export default class HttpServer extends Server {
  public constructor(app: Express) {
    super(app);
  }

  public configure(): void {
    this.setConfig(this);
    this.setErrorHandler(this);
    this.setListeningHandler(this);
  }

  private setConfig(server: Server): void {
    const serverConfig = new ServerConfig(server);
    serverConfig.process();
  }

  private setErrorHandler(server: Server): void {
    server.on('error', (err: Error) => {
      logger.error(err);
      process.exit(1);
    });
  }

  private setListeningHandler(server: Server): void {
    server.on('listening', () => {
      const { port } = server.address() as AddressInfo;
      logger.info(`Server up & running at http://localhost:${port}`);
    });
  }
}
