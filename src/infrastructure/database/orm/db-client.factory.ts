import SequelizeClient from '../orm/sequelize/client';
import MikroOrmClient from './mikroorm/client';
import InMemoryClient from '../orm/in-memory/client';

import { DatabaseClient } from './interfaces';

import * as constants from '@config/constants';

export default class DatabaseClientFactory {
  public constructor() {}

  public makeClient(dbDialect: string): DatabaseClient {
    const databaseClientMaker = this.selectDatabaseClientMaker(dbDialect);
    const databaseClient = databaseClientMaker();
    databaseClient.setDialect(dbDialect);
    return databaseClient;
  }

  private selectDatabaseClientMaker(dbDialect: string): () => DatabaseClient {
    const { dbDialects } = constants;

    const databaseClientByDialect = {
      [dbDialects.MARIA_DB]: () => new SequelizeClient(),
      [dbDialects.POSTGRES]: () => new MikroOrmClient(),
      [dbDialects.IN_MEMORY]: () => new InMemoryClient()
    };

    if (dbDialect in databaseClientByDialect) {
      const databaseClientMaker = databaseClientByDialect[dbDialect];
      return databaseClientMaker;
    }

    return databaseClientByDialect[dbDialects.IN_MEMORY];
  }
}
