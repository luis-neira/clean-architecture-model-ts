import { ProductsRepositoryInMemory } from '../orm/in-memory/repositories';
import { ProductsRepositorySequelize } from '../orm/sequelize/repositories';
import { ProductsRepositoryMirkroORM } from '../orm/mikroorm/repositories';

import * as constants from '@config/constants';

import { IProductsGateway } from '@core/use-cases/interfaces';
import { RepositoryFactory } from './interfaces';

export default class ProductsRepositoryFactory extends RepositoryFactory<IProductsGateway> {
  public create(dbClient: string): IProductsGateway {
    const { dbClients } = constants;

    const productsRepositoryMakerByDialect = {
      [dbClients.SEQUELIZE]: () => new ProductsRepositorySequelize(),
      [dbClients.MIKRO_ORM]: () => new ProductsRepositoryMirkroORM(),
      [dbClients.IN_MEMORY]: () => new ProductsRepositoryInMemory()
    };

    const repositoryMaker = this.selectRepositoryMaker(
      productsRepositoryMakerByDialect,
      dbClient
    );

    return repositoryMaker();
  }
}
