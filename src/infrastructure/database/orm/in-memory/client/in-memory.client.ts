import { InMemoryDatabase } from '../in-memory';

import logger from '@common/logger';
import DatabaseClient from '../../interfaces/db-client.abstract';

export default class InMemoryClient extends DatabaseClient {
  public constructor() {
    super();
    Object.seal(this);
  }

  public async connect(): Promise<void> {
    try {
      let { default: inMemoryDB } = await import('../in-memory');

      this._connection = inMemoryDB;

      logger.info('Successfully using "in-memory" database');
    } catch (err) {
      process.exit(1);
    }
  }

  public async close(): Promise<null | void> {
    if (!this._connection) return null;

    (this._connection as InMemoryDatabase).clearDatabase();

    logger.info('Successfully cleared "in-memory" database');
  }
}
