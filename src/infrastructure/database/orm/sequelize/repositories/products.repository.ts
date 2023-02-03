import { Model, ModelCtor, Sequelize } from 'sequelize';

import { IProductsGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '../../interfaces';
import { Product } from '@infra/database/orm/sequelize/models/Product';

export default class ProductsRepository
  extends DatabaseRepository
  implements IProductsGateway
{
  protected _db!: Sequelize;

  private _model: ModelCtor<Product>;

  public constructor() {
    super();
    this._model = this._db.model('Product') as ModelCtor<Product>;
  }

  public async create(input: any): Promise<Product> {
    const user = await this._model.create(input);

    return user;
  }

  public async save(product: Product): Promise<Product> {
    const savedProduct = await product.save();

    return savedProduct;
  }

  public async findOne(productId: string): Promise<Product | null> {
    const foundProduct = await this._model.findOne({
      where: { id: productId }
    });

    if (!foundProduct) return null;

    return foundProduct;
  }

  public update(
    product: Product,
    input: Record<string, any>
  ): Product {
    return product.set({
      ...input
    })
  }

  public async remove(id: string): Promise<true | null> {
    const foundProduct = await this._model.findOne({
      where: { id }
    });

    if (!foundProduct) return null;

    await foundProduct.destroy();

    return true;
  }

  public async findAll(): Promise<Product[]> {
    const foundProducts = await this._model.findAll();

    return foundProducts;
  }
}
