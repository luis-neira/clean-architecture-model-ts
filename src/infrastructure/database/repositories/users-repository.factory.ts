import { UsersRepositoryInMemory } from '../orm/in-memory/repositories';
import { UsersRepositorySequelize } from '../orm/sequelize/repositories';
import { UsersRepositoryMirkroORM } from '../orm/mikroorm/repositories';

import * as constants from '@config/constants';

import { IEntityGateway } from '@core/use-cases/interfaces';
import { RepositoryFactory } from './interfaces';

export default class UsersRepositoryFactory extends RepositoryFactory<IEntityGateway> {
  public create(dbDialect: string): IEntityGateway {
    const { dbDialects } = constants;

    const usersRepositoryMakerByDialect = {
      [dbDialects.MARIA_DB]: () => new UsersRepositorySequelize(),
      [dbDialects.POSTGRES]: () => new UsersRepositoryMirkroORM(),
      [dbDialects.IN_MEMORY]: () => new UsersRepositoryInMemory()
    };

    const repositoryMaker = this.selectRepositoryMaker(
      usersRepositoryMakerByDialect,
      dbDialect
    );

    return repositoryMaker();
  }
}
