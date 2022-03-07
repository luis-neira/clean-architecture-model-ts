import { ItemsRepositoryInMemory } from '../orm/in-memory/repositories';
// import { OrdersRepositorySequelize } from '../orm/sequelize/repositories';

import * as constants from '../../../config/constants';

import { IItemsGateway } from '../../../core/use-cases/interfaces';
import { RepositoryFactory } from './interfaces';

export default class ItemsRepositoryFactory extends RepositoryFactory<IItemsGateway> {
  public create(dbDialect: string): IItemsGateway {
    const { dbDialects } = constants;

    const itemsRepositoryMakerByDialect = {
      // [dbDialects.MARIA_DB]: () => new OrdersRepositorySequelize(),
      [dbDialects.IN_MEMORY]: () => new ItemsRepositoryInMemory()
    };

    const repositoryMaker = this.selectRepositoryMaker(
      itemsRepositoryMakerByDialect,
      dbDialect
    );

    return repositoryMaker();
  }
}
