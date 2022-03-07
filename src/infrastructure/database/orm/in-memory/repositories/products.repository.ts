import { Product } from '../../../../../core/entities';
import { InMemoryDatabase } from '../in-memory';
import { ProductMap } from '../../../../../common/mappers';

import { DatabaseRepository } from '../../interfaces';
import { IProductsGateway } from '../../../../../core/use-cases/interfaces';

export default class ProductsRepository
  extends DatabaseRepository
  implements IProductsGateway
{
  private _model: any[];

  public constructor() {
    super();
    this._model = (this._db as InMemoryDatabase).getModel('Product')!;
  }

  public async create(product: Product): Promise<Product> {
    this._model.push(ProductMap.toPersistence(product));

    const persistedUser = this._model[this._model.length - 1];

    return ProductMap.toDomain(persistedUser);
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

    return ProductMap.toDomain(this._model[productIndex]);
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

    return ProductMap.toDomain(persistedUser);
  }

  public async find(): Promise<Product[]> {
    return this._model;
  }
}
