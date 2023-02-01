import { MikroORM, EntityRepository, wrap } from '@mikro-orm/core';

import { IOrdersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '@infra/database/orm/interfaces';
import { Order } from '@infra/database/orm/mikroorm/entities'

export default class OrdersRepository
  extends DatabaseRepository
  implements IOrdersGateway
{
  protected _db!: MikroORM

  private _model: EntityRepository<Order>;

  public constructor() {
    super();
    this._model = this._db.em.getRepository(Order);
  }

  public async create(input: any): Promise<Order> {
    const order = await this._model.create(input);

    return order;
  }

  public async save(order: Order): Promise<Order> {
    await this._model.persistAndFlush(order);

    return order;
  }

  public async findOne(orderId: string): Promise<Order | null> {
    const foundOrder = await this._model.findOne({ id: orderId });

    return foundOrder;
  }

  public async update(
    input: any,
    context: { id: string }
  ): Promise<Order | null> {
    const foundOrder = await this._model.findOne({ id: context.id });

    if (!foundOrder) return null;

    const updatedOrder = wrap(foundOrder).assign(input, {
      mergeObjects: true
    });

    await this._model.persistAndFlush(updatedOrder);

    return updatedOrder;
  }

  public async delete(id: string): Promise<true | null> {
    const foundOrder = await this._model.findOne({ id });

    if (!foundOrder) return null;

    await this._model.removeAndFlush(foundOrder);

    return true;
  }

  public async findAll(): Promise<Order[]> {
    const foundOrders = await this._model.findAll({ populate: ['user'] });

    return foundOrders;
  }
}
