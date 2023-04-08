import SequelizeClient from './sequelize/client';
import MikroOrmClient from './mikroorm/client';
import InMemoryClient from './in-memory/client';

import { DatabaseClient } from './interfaces';

import * as constants from '@config/constants';

export default class DatabaseClientFactory {
  public constructor() {}

  public makeClient(dbClient: string): DatabaseClient {
    const databaseClientMaker = this.selectDatabaseClientMaker(dbClient);
    const databaseClient = databaseClientMaker();
    databaseClient.setDialect(dbClient);
    return databaseClient;
  }

  private selectDatabaseClientMaker(dbClient: string): () => DatabaseClient {
    const { dbClients } = constants;

    const databaseClientByClient = {
      [dbClients.SEQUELIZE]: () => new SequelizeClient(),
      [dbClients.MIKRO_ORM]: () => new MikroOrmClient(),
      [dbClients.IN_MEMORY]: () => new InMemoryClient()
    };

    if (dbClient in databaseClientByClient) {
      const databaseClientMaker = databaseClientByClient[dbClient];
      return databaseClientMaker;
    }

    return databaseClientByClient[dbClients.IN_MEMORY];
  }
}
