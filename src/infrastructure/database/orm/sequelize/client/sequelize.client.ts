import type { Sequelize } from 'sequelize';

import logger from '@common/logger';
import DatabaseClient from '../../interfaces/db-client.abstract';

export default class SequelizeClient extends DatabaseClient {
  public constructor() {
    super();
    Object.seal(this);
  }

  public async connect(): Promise<void> {
    try {
      let { sequelize } = await import('../sequelize');

      await sequelize.authenticate();

      this._connection = sequelize;

      logger.info('Database connection: Successfully established');
    } catch (err) {
      logger.error({ err }, 'Unable to connect to the database');

      process.exit(1);
    }

    try {
      await this._connection.sync();

      logger.info('Database synchronization: Successful');
    } catch (err) {
      this._connection = null;

      logger.error({ err }, 'Unable to synchronize with database');
    }
  }

  public async close(): Promise<null | void> {
    if (!this._connection) return null;

    await (this._connection as Sequelize).close();

    logger.info('Database connection: Successfully closed');
  }
}
