import { InMemoryDatabase } from '../in-memory';

import { Order } from '@core/entities';
import { OrderMapper } from '@core/mappers/order';
import IEntityMapper from '@core/mappers/i-entity-mapper';
import { IOrdersGateway } from '@core/use-cases/interfaces';

import { DatabaseRepository } from '../../interfaces';

export default class OrdersRepository
  extends DatabaseRepository
  implements IOrdersGateway
{
  private _model: any[];

  private _dataMapper: Pick<IEntityMapper<Order, any>, 'toDomain'>;

  public constructor() {
    super();
    this._model = (this._db as InMemoryDatabase).getModel('Order')!;
    this._dataMapper = new OrderMapper();
  }

  public async create(input: any): Promise<Order> {
    return this._dataMapper.toDomain(input);
  }

  public async save(order: Order): Promise<Order> {
    this._model.push(order.toJSON());

    const persistedOrder = this._model[this._model.length - 1];

    return this._dataMapper.toDomain(persistedOrder);
  }

  public update(
    order: Order,
    input: Record<string, any>
  ): Order {
    const updatedPojo = Object.assign({}, order.toJSON(), input);

    return this._dataMapper.toDomain(updatedPojo);
  }

  public async remove(id: string): Promise<true | null> {
    const orderIndex = this._model.findIndex((o: Order) => o.id === id);

    if (orderIndex < 0) return null;

    this._model.splice(orderIndex, 1);

    return true;
  }

  public async findOne(id: string): Promise<Order | null> {
    const persistedOrder = this._model.find((u: any) => u.id === id);

    if (!persistedOrder) return null;

    return this._dataMapper.toDomain(persistedOrder);
  }

  public async findAll(): Promise<Order[]> {
    return this._model.map((o) => this._dataMapper.toDomain(o));
  }
}
