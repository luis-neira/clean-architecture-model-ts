import { Server } from 'http';

import { createTerminus } from '@godaddy/terminus';

import { DatabaseClient } from '../../database/orm';
import logger from '@common/logger';

export default class ServerConfig {
  private _server: Server;

  public constructor(server: Server) {
    this._server = server;
    Object.freeze(this);
  }

  public process(): Server {
    return createTerminus(this._server, {
      logger: (msg, err) => {
        logger.error({ err }, msg);
      },
      signals: ['SIGINT', 'SIGTERM'],
      timeout: 20000,
      healthChecks: {
        '/healthcheck': () => Promise.resolve()
      },
      beforeShutdown: this.beforeShutdown,
      onSignal: this.onSignal,
      onShutdown: this.onShutdown
    });
  }

  private async beforeShutdown(): Promise<void> {
    logger.info('Server is starting cleanup');
    return;
  }

  private async onSignal(): Promise<void> {
    logger.info('All server connections: Closed');
    const databaseClient = DatabaseClient.getInstance();
    await databaseClient.close();
    return;
  }

  private async onShutdown(): Promise<void> {
    logger.info('Cleanup finished, server is shutting down');
    return;
  }
}
