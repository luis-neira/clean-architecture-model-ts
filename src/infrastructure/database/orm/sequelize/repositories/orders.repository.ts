import { Model, ModelCtor, Sequelize } from 'sequelize';

import { OrderMap } from '../../../../../common/mappers';
import { Order } from '../../../../../core/entities';

import { DatabaseRepository } from '../../interfaces';
import { IOrdersGateway } from '../../../../../core/use-cases/interfaces';

export default class OrdersRepository
  extends DatabaseRepository
  implements IOrdersGateway
{
  private _model: ModelCtor<Model<any, any>>;

  public constructor() {
    super();
    this._model = (this._db as Sequelize).model('Order');
  }

  public async create(order: Order): Promise<Order> {
    const orderRawData = OrderMap.toPersistence(order);

    const addedOrder = await this._model.create(orderRawData);

    return OrderMap.toDomain(addedOrder.toJSON());
  }

  public async findOne(orderId: string): Promise<Order | null> {
    const foundOrder = await this._model.findOne({
      where: { id: orderId }
    });

    if (!foundOrder) return null;

    return OrderMap.toDomain(foundOrder.toJSON());
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

    return OrderMap.toDomain(foundOrder.toJSON());
  }

  public async delete(id: string): Promise<true | null> {
    const foundOrder = await this._model.findOne({
      where: { id }
    });

    if (!foundOrder) return null;

    await foundOrder.destroy();

    return true;
  }

  public async find(): Promise<Order[]> {
    const foundProducts = (await this._model.findAll()).map((el) =>
      OrderMap.toDomain(el.toJSON())
    );

    return foundProducts;
  }
}
