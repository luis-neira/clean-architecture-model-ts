import { ModelCtor, Sequelize } from 'sequelize';

import { IOrdersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '../../interfaces';
import { Order } from '@infra/database/orm/sequelize/models/Order';

export default class OrdersRepository
  extends DatabaseRepository
  implements IOrdersGateway
{
  protected _db!: Sequelize;

  private _model: ModelCtor<Order>;

  public constructor() {
    super();
    this._model = this._db.model('Order') as ModelCtor<Order>;
  }

  public async create(input: any): Promise<Order> {
    const order = await this._model.create(input);

    return order;
  }

  public async save(order: Order): Promise<Order> {
    const savedOrder = await order.save();

    return savedOrder;
  }

  public async findOne(orderId: string): Promise<Order | null> {
    const foundOrder = await this._model.findOne({
      where: { id: orderId }
    });

    if (!foundOrder) return null;

    return foundOrder;
  }

  public async update(
    input: any,
    context: { id: string }
  ): Promise<Order | null> {
    const foundOrder = await this._model.findOne({
      where: { id: context.id }
    });

    if (!foundOrder) return null;

    Reflect.deleteProperty(input, 'id');

    foundOrder.set({
      ...input
    });

    const savedOrder = await foundOrder.save();

    return savedOrder;
  }

  public async remove(id: string): Promise<true | null> {
    const foundOrder = await this._model.findOne({
      where: { id }
    });

    if (!foundOrder) return null;

    await foundOrder.destroy();

    return true;
  }

  public async findAll(): Promise<Order[]> {
    const foundProducts = await this._model.findAll();

    return foundProducts;
  }
}
