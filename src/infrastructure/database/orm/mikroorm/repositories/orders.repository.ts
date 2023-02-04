import { MikroORM, EntityRepository, wrap } from '@mikro-orm/core';

import { IOrdersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '@infra/database/orm/interfaces';
import { Order } from '@infra/database/orm/mikroorm/entities';

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

  public create(input: any): Order {
    const order = this._model.create(input);

    return order;
  }

  public update(
    order: Order,
    input: Record<string, any>
  ): Order {
    return this._model.assign(order, { ...input }, {
      mergeObjects: true
    });
  }

  public async save(order: Order): Promise<Order> {
    await this._model.persistAndFlush(order);

    return order;
  }

  public async remove(id: string): Promise<true | null> {
    const foundOrder = await this._model.findOne({ id });

    if (!foundOrder) return null;

    await this._model.removeAndFlush(foundOrder);

    return true;
  }

  public async findAll(): Promise<Order[]> {
    const foundOrders = await this._model.findAll();

    return foundOrders;
  }

  public async findAllOrdersWithProductsAndUser(): Promise<Order[]> {
    const foundOrders = await this._model.findAll({ populate: ['user', 'products'] });

    return foundOrders;
  }

  public async findOne(id: string): Promise<Order | null> {
    const foundOrder = await this._model.findOne({ id });

    return foundOrder;
  }

  public async findOneOrderWithProductsAndUser(id: string): Promise<Order | null> {
    const foundOrder = await this._model.findOne({ id }, { populate: ['user', 'products'] });

    return foundOrder;
  }
}
