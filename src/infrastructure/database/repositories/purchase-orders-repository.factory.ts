import { PurchaseOrdersRepositoryInMemory } from '../orm/in-memory/repositories';
// import { OrdersRepositorySequelize } from '../orm/sequelize/repositories';

import * as constants from '../../../config/constants';

import { IPurchaseOrdersGateway } from '../../../core/use-cases/interfaces';
import { RepositoryFactory } from './interfaces';

export default class PurchaseOrdersRepositoryFactory extends RepositoryFactory<IPurchaseOrdersGateway> {
  public create(dbDialect: string): IPurchaseOrdersGateway {
    const { dbDialects } = constants;

    const customersRepositoryMakerByDialect = {
      // [dbDialects.MARIA_DB]: () => new OrdersRepositorySequelize(),
      [dbDialects.IN_MEMORY]: () => new PurchaseOrdersRepositoryInMemory()
    };

    const repositoryMaker = this.selectRepositoryMaker(
      customersRepositoryMakerByDialect,
      dbDialect
    );

    return repositoryMaker();
  }
}
