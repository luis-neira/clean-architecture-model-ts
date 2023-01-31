import { Model, ModelCtor, Sequelize } from 'sequelize';

import { Product } from '@core/entities';
import { ProductMapper } from '@core/mappers/product';
import IEntityMapper from '@core/mappers/i-entity-mapper';
import { IProductsGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '../../interfaces';

export default class ProductsRepository
  extends DatabaseRepository
  implements IProductsGateway
{
  private _model: ModelCtor<Model<any, any>>;

  private _dataMapper: Pick<IEntityMapper<Product, any>, 'toDomain'>;

  public constructor() {
    super();
    this._model = (this._db as Sequelize).model('Product');
    this._dataMapper = new ProductMapper();
  }

  public async save(product: Product): Promise<Product> {
    const productRawData = product.toJSON();

    const addedProduct = await this._model.create(productRawData);

    return this._dataMapper.toDomain(addedProduct.toJSON());
  }

  public async findOne(productId: string): Promise<Product | null> {
    const foundProduct = await this._model.findOne({
      where: { id: productId }
    });

    if (!foundProduct) return null;

    return this._dataMapper.toDomain(foundProduct.toJSON());
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

    return this._dataMapper.toDomain(foundProduct.toJSON());
  }

  public async delete(id: string): Promise<true | null> {
    const foundProduct = await this._model.findOne({
      where: { id }
    });

    if (!foundProduct) return null;

    await foundProduct.destroy();

    return true;
  }

  public async findAll(): Promise<Product[]> {
    const foundProducts = (await this._model.findAll()).map((el) =>
      this._dataMapper.toDomain(el.toJSON())
    );

    return foundProducts;
  }
}
