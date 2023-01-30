import { MikroORM } from '@mikro-orm/core';
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'; 

import logger from '@common/logger';
import DatabaseClient from '../../interfaces/db-client.abstract';

export default class MikroOrmClient extends DatabaseClient {
  public constructor() {
    super();
    Object.seal(this);
  }

  public async connect(): Promise<void> {
    try {
      const mikroOrmConfig = await import('../mikroorm');

      const orm = await MikroORM.init<PostgreSqlDriver>(mikroOrmConfig.default);

      this._connection = orm;

      logger.info('Database connection: Successfully established');

      try {
        const generator = orm.getSchemaGenerator();

        const isSchemaExists = await generator.ensureDatabase();

        if (isSchemaExists === false) {
          await generator.refreshDatabase(); 
          logger.info('Database refresh: Successful');
        }

        if (process.env.DB_REFRESH === 'true') {
          await generator.refreshDatabase(); 
          logger.info('Database refresh: Successful');
        }
        
      } catch (err) {
        this._connection = null;
  
        logger.error({ err }, 'Unable to synchronize with database');
      }


    } catch (err) {
      logger.error({ err }, 'Unable to connect to the database');

      process.exit(1);
    }
  }

  public async close(): Promise<null | void> {
    if (!this._connection) return null;

    await (this._connection as MikroORM).close(true);

    logger.info('Database connection: Successfully closed');
  }
}
