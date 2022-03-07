import { PurchaseOrder } from '../../../../../core/entities';
import { InMemoryDatabase } from '../in-memory';

import { DatabaseRepository } from '../../interfaces';
import { IPurchaseOrdersGateway } from '../../../../../core/use-cases/interfaces';

export default class PurchaseOrdersRepository
  extends DatabaseRepository
  implements IPurchaseOrdersGateway
{
  private _model: any[];

  public constructor() {
    super();
    this._model = (this._db as InMemoryDatabase).getModel('Purchase_Order')!;
  }

  public async create(order: PurchaseOrder): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async createMany(orders: PurchaseOrder[]): Promise<boolean> {
    const rawOrders = orders.map((o) => o.getProps());

    for (const order of rawOrders) {
      this._model.push(order);
    }

    return true;
  }

  public async update(
    customer: PurchaseOrder,
    context: { id: string }
  ): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async delete(id: string): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async findOne(id: string): Promise<PurchaseOrder | null> {
    const foundOrder = this._model.find((o) => o.order_id === id);

    if (!foundOrder) return null;

    return PurchaseOrder.create(foundOrder, null);
  }

  public async find(): Promise<PurchaseOrder[]> {
    return this._model;
  }
}
