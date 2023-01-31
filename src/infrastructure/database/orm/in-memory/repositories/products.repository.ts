import { InMemoryDatabase } from '../in-memory';

import { Product } from '@core/entities';
import { ProductMapper } from '@core/mappers/product'
import IEntityMapper from '@core/mappers/i-entity-mapper'
import { IProductsGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '../../interfaces';

export default class ProductsRepository
  extends DatabaseRepository
  implements IProductsGateway
{
  private _model: any[];

  private _dataMapper: Pick<IEntityMapper<Product, any>, 'toDomain'>;

  public constructor() {
    super();
    this._model = (this._db as InMemoryDatabase).getModel('Product')!;
    this._dataMapper = new ProductMapper();
  }

  public async save(product: Product): Promise<Product> {
    this._model.push(product.toJSON());

    const persistedUser = this._model[this._model.length - 1];

    return this._dataMapper.toDomain(persistedUser);
  }

  public async update(
    product: Product,
    context: { id: string }
  ): Promise<Product | null> {
    const productIndex = this._model.findIndex(
      (p: Product) => p.id === context.id
    );

    if (productIndex < 0) return null;

    const updatedProduct = product.toJSON();
    Reflect.deleteProperty(updatedProduct, 'id');

    Object.assign(this._model[productIndex], updatedProduct);

    return this._dataMapper.toDomain(this._model[productIndex]);
  }

  public async delete(id: string): Promise<true | null> {
    const productIndex = this._model.findIndex((p: Product) => p.id === id);

    if (productIndex < 0) return null;

    this._model.splice(productIndex, 1);

    return true;
  }

  public async findOne(id: string): Promise<Product | null> {
    const persistedUser = this._model.find((p: Product) => p.id === id);

    if (!persistedUser) return null;

    return this._dataMapper.toDomain(persistedUser);
  }

  public async findAll(): Promise<Product[]> {
    return this._model;
  }
}
