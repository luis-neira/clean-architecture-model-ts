import { MikroORM, EntityRepository, wrap } from '@mikro-orm/core';

import { IProductsGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '@infra/database/orm/interfaces';
import { Product } from '@infra/database/orm/mikroorm/entities'

export default class ProductsRepository
  extends DatabaseRepository
  implements IProductsGateway
{
  protected _db!: MikroORM

  private _model: EntityRepository<Product>;

  public constructor() {
    super();
    this._model = this._db.em.getRepository(Product);
  }

  public create(input: any): Product {
    const product = this._model.create(input);

    return product;
  }

  public update(
    product: Product,
    input: Record<string, any>,
  ): Product {
    return this._model.assign(product, { ...input }, {
      mergeObjects: true
    });
  }

  public async save(product: Product): Promise<Product> {
    if (!!product === true) {
      await this._model.persistAndFlush(product);
    } else {
      await this._model.flush();
    }

    return product;
  }

  public async findOne(productId: string): Promise<Product | null> {
    const foundProduct = await this._model.findOne({ id: productId });

    return foundProduct;
  }

  public async remove(id: string): Promise<true | null> {
    const foundProduct = await this._model.findOne({ id });

    if (!foundProduct) return null;

    await this._model.removeAndFlush(foundProduct);

    return true;
  }

  public async findAll(): Promise<Product[]> {
    const foundProducts = await this._model.findAll();

    return foundProducts;
  }
}
