import { OrdersRepositoryInMemory } from '../orm/in-memory/repositories';
import { OrdersRepositorySequelize } from '../orm/sequelize/repositories';
import { OrdersRepositoryMirkroORM } from '../orm/mikroorm/repositories';

import * as constants from '../../../config/constants';

import { IEntityGateway } from '@core/use-cases/interfaces';
import { RepositoryFactory } from './interfaces';

export default class OrdersRepositoryFactory extends RepositoryFactory<IEntityGateway> {
  public create(dbDialect: string): IEntityGateway {
    const { dbDialects } = constants;

    const ordersRepositoryMakerByDialect = {
      [dbDialects.MARIA_DB]: () => new OrdersRepositorySequelize(),
      [dbDialects.POSTGRES]: () => new OrdersRepositoryMirkroORM(),
      [dbDialects.IN_MEMORY]: () => new OrdersRepositoryInMemory()
    };

    const repositoryMaker = this.selectRepositoryMaker(
      ordersRepositoryMakerByDialect,
      dbDialect
    );

    return repositoryMaker();
  }
}
