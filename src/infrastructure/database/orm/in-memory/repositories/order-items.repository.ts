import { OrderItem } from '../../../../../core/entities';
import { InMemoryDatabase } from '../in-memory';

import { DatabaseRepository } from '../../interfaces';
import { IOrderItemsGateway } from '../../../../../core/use-cases/interfaces';

export default class OrderItemsRepository
  extends DatabaseRepository
  implements IOrderItemsGateway
{
  private _model: any[];

  public constructor() {
    super();
    this._model = (this._db as InMemoryDatabase).getModel('Order_Item')!;
  }

  public async create(order: OrderItem): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async createMany(orders: OrderItem[]): Promise<boolean> {
    const rawOrders = orders.map((o) => o.getProps());

    for (const order of rawOrders) {
      this._model.push(order);
    }

    return true;
  }

  public async update(
    customer: OrderItem,
    context: { id: string }
  ): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async delete(id: string): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async findOne(id: string): Promise<OrderItem | null> {
    const foundOrderItem = this._model.find((o) => o.item_number === id);

    if (!foundOrderItem) return null;

    return OrderItem.create(foundOrderItem, null);
  }

  public async find(): Promise<OrderItem[]> {
    return this._model;
  }
}
