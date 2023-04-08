import { OrdersRepositoryInMemory } from '../orm/in-memory/repositories';
import { OrdersRepositorySequelize } from '../orm/sequelize/repositories';
import { OrdersRepositoryMirkroORM } from '../orm/mikroorm/repositories';

import * as constants from '../../../config/constants';

import { IOrdersGateway } from '@core/use-cases/interfaces';
import { RepositoryFactory } from './interfaces';

export default class OrdersRepositoryFactory extends RepositoryFactory<IOrdersGateway> {
  public create(dbClient: string): IOrdersGateway {
    const { dbClients } = constants;

    const ordersRepositoryMakerByDialect = {
      [dbClients.SEQUELIZE]: () => new OrdersRepositorySequelize(),
      [dbClients.MIKRO_ORM]: () => new OrdersRepositoryMirkroORM(),
      [dbClients.IN_MEMORY]: () => new OrdersRepositoryInMemory()
    };

    const repositoryMaker = this.selectRepositoryMaker(
      ordersRepositoryMakerByDialect,
      dbClient
    );

    return repositoryMaker();
  }
}
