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

  public async create(input: any): Promise<Product> {
    const product = await this._model.create(input);

    return product;
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

  public async update(
    input: any,
    context: { id: string }
  ): Promise<Product | null> {
    const foundProduct = await this._model.findOne({ id: context.id });

    if (!foundProduct) return null;

    wrap(foundProduct).assign(input, { mergeObjects: true });

    await this._model.persistAndFlush(foundProduct);

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
