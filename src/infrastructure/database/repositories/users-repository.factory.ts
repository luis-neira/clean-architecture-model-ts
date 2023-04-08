import { UsersRepositoryInMemory } from '../orm/in-memory/repositories';
import { UsersRepositorySequelize } from '../orm/sequelize/repositories';
import { UsersRepositoryMirkroORM } from '../orm/mikroorm/repositories';

import * as constants from '@config/constants';

import { IUsersGateway } from '@core/use-cases/interfaces';
import { RepositoryFactory } from './interfaces';

export default class UsersRepositoryFactory extends RepositoryFactory<IUsersGateway> {
  public create(dbClient: string): IUsersGateway {
    const { dbClients } = constants;

    const usersRepositoryMakerByDialect = {
      [dbClients.SEQUELIZE]: () => new UsersRepositorySequelize(),
      [dbClients.MIKRO_ORM]: () => new UsersRepositoryMirkroORM(),
      [dbClients.IN_MEMORY]: () => new UsersRepositoryInMemory()
    };

    const repositoryMaker = this.selectRepositoryMaker(
      usersRepositoryMakerByDialect,
      dbClient
    );

    return repositoryMaker();
  }
}
