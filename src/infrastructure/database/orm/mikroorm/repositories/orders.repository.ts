import type { MikroORM, EntityRepository } from '@mikro-orm/core';

import { Order } from '@core/entities';
import { OrderMapper } from '@core/mappers/order';
import IEntityMapper from '@core/mappers/i-entity-mapper';
import { IOrdersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '@infra/database/orm/interfaces';

export default class OrdersRepository
  extends DatabaseRepository
  implements IOrdersGateway
{
  protected _db!: MikroORM

  private _model: EntityRepository<Order>;
  private _dataMapper: Pick<IEntityMapper<Order, any>, 'toDomain'>;

  public constructor() {
    super();
    this._model = this._db.em.getRepository(Order);
    this._dataMapper = new OrderMapper();
  }

  public async save(order: Order): Promise<Order> {
    const orderRawData = order.toJSON();

    const addedOrder = await this._model.create(orderRawData);

    await this._model.persistAndFlush(addedOrder);

    return this._dataMapper.toDomain(addedOrder.toJSON());
  }

  public async findOne(orderId: string): Promise<Order | null> {
    const foundOrder = await this._model.findOne({ id: orderId });

    if (!foundOrder) return null;

    return this._dataMapper.toDomain(foundOrder.toJSON());
  }

  public async update(
    order: Order,
    context: { id: string }
  ): Promise<Order | null> {
    const foundOrder = await this._model.findOne({ id: context.id });

    if (!foundOrder) return null;

    Object.assign(foundOrder, order.getProps());

    await this._model.persistAndFlush(foundOrder);

    return this._dataMapper.toDomain(foundOrder.toJSON());
  }

  public async delete(id: string): Promise<true | null> {
    const foundOrder = await this._model.findOne({ id });

    if (!foundOrder) return null;

    await this._model.removeAndFlush(foundOrder);

    return true;
  }

  public async findAll(): Promise<Order[]> {
    const foundOrders = (await this._model.findAll()).map((u) =>
      this._dataMapper.toDomain(u.toJSON())
    );

    return foundOrders;
  }
}
