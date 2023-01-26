import { ProductsRepositoryInMemory } from '../orm/in-memory/repositories';
import { ProductsRepositorySequelize } from '../orm/sequelize/repositories';

import * as constants from '@config/constants';

import { IEntityGateway } from '@core/use-cases/interfaces';
import { RepositoryFactory } from './interfaces';

export default class ProductsRepositoryFactory extends RepositoryFactory<IEntityGateway> {
  public create(dbDialect: string): IEntityGateway {
    const { dbDialects } = constants;

    const productsRepositoryMakerByDialect = {
      [dbDialects.MARIA_DB]: () => new ProductsRepositorySequelize(),
      [dbDialects.POSTGRES]: () => new ProductsRepositorySequelize(),
      [dbDialects.IN_MEMORY]: () => new ProductsRepositoryInMemory()
    };

    const repositoryMaker = this.selectRepositoryMaker(
      productsRepositoryMakerByDialect,
      dbDialect
    );

    return repositoryMaker();
  }
}
