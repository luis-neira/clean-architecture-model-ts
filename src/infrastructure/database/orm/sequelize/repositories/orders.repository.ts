import { Model, ModelCtor, Sequelize } from 'sequelize';

import { Order } from '@core/entities';
import { OrderMapper } from '@core/mappers/order';
import IEntityMapper from '@core/mappers/i-entity-mapper';
import { IOrdersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '../../interfaces';

export default class OrdersRepository
  extends DatabaseRepository
  implements IOrdersGateway
{
  private _model: ModelCtor<Model<any, any>>;

  private _dataMapper: Pick<IEntityMapper<Order, any>, 'toDomain'>;

  public constructor() {
    super();
    this._model = (this._db as Sequelize).model('Order');
    this._dataMapper = new OrderMapper();
  }

  public async save(order: Order): Promise<Order> {
    const orderRawData = order.toJSON();

    const addedOrder = await this._model.create(orderRawData);

    return this._dataMapper.toDomain(addedOrder.toJSON());
  }

  public async findOne(orderId: string): Promise<Order | null> {
    const foundOrder = await this._model.findOne({
      where: { id: orderId }
    });

    if (!foundOrder) return null;

    return this._dataMapper.toDomain(foundOrder.toJSON());
  }

  public async update(
    order: Order,
    context: { id: string }
  ): Promise<Order | null> {
    const foundOrder = await this._model.findOne({
      where: { id: context.id }
    });

    if (!foundOrder) return null;

    const updatedOrder = order.toJSON();
    Reflect.deleteProperty(updatedOrder, 'id');

    foundOrder.set({
      ...updatedOrder
    });

    await foundOrder.save();

    return this._dataMapper.toDomain(foundOrder.toJSON());
  }

  public async delete(id: string): Promise<true | null> {
    const foundOrder = await this._model.findOne({
      where: { id }
    });

    if (!foundOrder) return null;

    await foundOrder.destroy();

    return true;
  }

  public async findAll(): Promise<Order[]> {
    const foundProducts = (await this._model.findAll()).map((el) =>
      this._dataMapper.toDomain(el.toJSON())
    );

    return foundProducts;
  }
}
