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

  public create(input: any): Product {
    return this._dataMapper.toDomain(input);
  }

  public update(
    product: Product,
    input: Record<string, any>
  ): Product {
    const updatedPojo = Object.assign({}, product.toJSON(), input);

    return this._dataMapper.toDomain(updatedPojo);
  }

  public async save(product: Product): Promise<Product> {
    this._model.push(product.toJSON());

    const persistedUser = this._model[this._model.length - 1];

    return this._dataMapper.toDomain(persistedUser);
  }

  public async remove(id: string): Promise<true | null> {
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
    return this._model.map((p) => this._dataMapper.toDomain(p));
  }
}
