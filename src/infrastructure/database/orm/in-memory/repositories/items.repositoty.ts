import { Item } from '../../../../../core/entities';
import { InMemoryDatabase } from '../in-memory';

import { DatabaseRepository } from '../../interfaces';
import { IItemsGateway } from '../../../../../core/use-cases/interfaces';

export default class ItemsRepository
  extends DatabaseRepository
  implements IItemsGateway
{
  private _model: any[];

  public constructor() {
    super();
    this._model = (this._db as InMemoryDatabase).getModel('Item')!;
  }

  public async create(item: Item): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async putMany(items: Item[]): Promise<boolean> {
    const rawItems = items.map((item) => item.getProps());

    rawItems.forEach((item) => {
      const foundItem = this._model.find((el) => el.upc === item.upc);
      const foundIndex = this._model.findIndex((el) => el.upc === item.upc);

      if (!foundItem) return this._model.push(item);

      this._model[foundIndex] = foundItem;
    });

    return true;
  }

  public async update(item: Item, context: { id: string }): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async delete(id: string): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async findOne(upc: string): Promise<Item | null> {
    const foundItem = this._model.find((u) => u.upc === upc);

    if (!foundItem) return null;

    return Item.create(foundItem, null);
  }

  public async find(): Promise<Item[]> {
    return this._model;
  }
}
