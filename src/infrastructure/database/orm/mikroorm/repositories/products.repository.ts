import type { MikroORM, EntityRepository } from '@mikro-orm/core';

import { Product } from '@core/entities';
import { ProductMapper } from '@core/mappers/product';
import IEntityMapper from '@core/mappers/i-entity-mapper';
import { IProductsGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '@infra/database/orm/interfaces';

export default class ProductsRepository
  extends DatabaseRepository
  implements IProductsGateway
{
  protected _db!: MikroORM

  private _model: EntityRepository<Product>;
  private _dataMapper: Pick<IEntityMapper<Product, any>, 'toDomain'>;

  public constructor() {
    super();
    this._model = this._db.em.getRepository(Product);
    this._dataMapper = new ProductMapper();
  }

  public async save(product: Product): Promise<Product> {
    const productRawData = product.toJSON();

    const addedProduct = await this._model.create(productRawData);

    await this._model.persistAndFlush(addedProduct);

    return this._dataMapper.toDomain(addedProduct.toJSON());
  }

  public async findOne(productId: string): Promise<Product | null> {
    const foundProduct = await this._model.findOne({ id: productId });

    if (!foundProduct) return null;

    return this._dataMapper.toDomain(foundProduct.toJSON());
  }

  public async update(
    product: Product,
    context: { id: string }
  ): Promise<Product | null> {
    const foundProduct = await this._model.findOne({ id: context.id });

    if (!foundProduct) return null;

    Object.assign(foundProduct, product.getProps());

    await this._model.persistAndFlush(foundProduct);

    return this._dataMapper.toDomain(foundProduct.toJSON());
  }

  public async delete(id: string): Promise<true | null> {
    const foundProduct = await this._model.findOne({ id });

    if (!foundProduct) return null;

    await this._model.removeAndFlush(foundProduct);

    return true;
  }

  public async findAll(): Promise<Product[]> {
    const foundProducts = (await this._model.findAll()).map((u) =>
      this._dataMapper.toDomain(u.toJSON())
    );

    return foundProducts;
  }
}
