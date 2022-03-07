import { Model, ModelCtor, Sequelize } from 'sequelize';

import { ProductMap } from '../../../../../common/mappers';
import { Product } from '../../../../../core/entities';

import { DatabaseRepository } from '../../interfaces';
import { IProductsGateway } from '../../../../../core/use-cases/interfaces';

export default class ProductsRepository
  extends DatabaseRepository
  implements IProductsGateway
{
  private _model: ModelCtor<Model<any, any>>;

  public constructor() {
    super();
    this._model = (this._db as Sequelize).model('Product');
  }

  public async create(product: Product): Promise<Product> {
    const productRawData = ProductMap.toPersistence(product);

    const addedProduct = await this._model.create(productRawData);

    return ProductMap.toDomain(addedProduct.toJSON());
  }

  public async findOne(productId: string): Promise<Product | null> {
    const foundProduct = await this._model.findOne({
      where: { id: productId }
    });

    if (!foundProduct) return null;

    return ProductMap.toDomain(foundProduct.toJSON());
  }

  public async update(
    product: Product,
    context: { id: string }
  ): Promise<Product | null> {
    const foundProduct = await this._model.findOne({
      where: { id: context.id }
    });

    if (!foundProduct) return null;

    const updatedProduct = product.toJSON();
    Reflect.deleteProperty(updatedProduct, 'id');

    foundProduct.set({
      ...updatedProduct
    });

    await foundProduct.save();

    return ProductMap.toDomain(foundProduct.toJSON());
  }

  public async delete(id: string): Promise<true | null> {
    const foundProduct = await this._model.findOne({
      where: { id }
    });

    if (!foundProduct) return null;

    await foundProduct.destroy();

    return true;
  }

  public async find(): Promise<Product[]> {
    const foundProducts = (await this._model.findAll()).map((el) =>
      ProductMap.toDomain(el.toJSON())
    );

    return foundProducts;
  }
}
