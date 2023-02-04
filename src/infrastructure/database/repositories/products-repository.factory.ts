import { ProductsRepositoryInMemory } from '../orm/in-memory/repositories';
import { ProductsRepositorySequelize } from '../orm/sequelize/repositories';
import { ProductsRepositoryMirkroORM } from '../orm/mikroorm/repositories';

import * as constants from '@config/constants';

import { IProductsGateway } from '@core/use-cases/interfaces';
import { RepositoryFactory } from './interfaces';

export default class ProductsRepositoryFactory extends RepositoryFactory<IProductsGateway> {
  public create(dbDialect: string): IProductsGateway {
    const { dbDialects } = constants;

    const productsRepositoryMakerByDialect = {
      [dbDialects.MARIA_DB]: () => new ProductsRepositorySequelize(),
      [dbDialects.POSTGRES]: () => new ProductsRepositoryMirkroORM(),
      [dbDialects.IN_MEMORY]: () => new ProductsRepositoryInMemory()
    };

    const repositoryMaker = this.selectRepositoryMaker(
      productsRepositoryMakerByDialect,
      dbDialect
    );

    return repositoryMaker();
  }
}
