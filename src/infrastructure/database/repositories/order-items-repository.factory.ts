import { OrderItemsRepositoryInMemory } from '../orm/in-memory/repositories';
// import { OrdersRepositorySequelize } from '../orm/sequelize/repositories';

import * as constants from '../../../config/constants';

import { IOrderItemsGateway } from '../../../core/use-cases/interfaces';
import { RepositoryFactory } from './interfaces';

export default class OrderItemsRepositoryFactory extends RepositoryFactory<IOrderItemsGateway> {
  public create(dbDialect: string): IOrderItemsGateway {
    const { dbDialects } = constants;

    const customersRepositoryMakerByDialect = {
      // [dbDialects.MARIA_DB]: () => new OrdersRepositorySequelize(),
      [dbDialects.IN_MEMORY]: () => new OrderItemsRepositoryInMemory()
    };

    const repositoryMaker = this.selectRepositoryMaker(
      customersRepositoryMakerByDialect,
      dbDialect
    );

    return repositoryMaker();
  }
}
