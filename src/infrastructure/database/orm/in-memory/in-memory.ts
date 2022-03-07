type ModelName =
  | 'User'
  | 'Product'
  | 'Order'
  | 'Item'
  | 'Customer'
  | 'Purchase_Order'
  | 'Order_Item';

export class InMemoryDatabase {
  private _users: any[];
  private _products: any[];
  private _orders: any[];
  private _items: any[];
  private _customer: any[];
  private _purchaseOrder: any[];
  private _orderItem: any[];

  public constructor() {
    this._users = [];
    this._products = [];
    this._orders = [];
    this._items = [];
    this._customer = [];
    this._purchaseOrder = [];
    this._orderItem = [];

    Object.seal(this);
  }

  public clearDatabase(): void {
    const newDB = new InMemoryDatabase();
    for (let key in this) {
      //@ts-ignore
      this[key] = newDB[key];
    }
  }

  public getModel(name: ModelName): any[] | null {
    const modelsDictionary = {
      User: this._users,
      Product: this._products,
      Order: this._orders,
      Item: this._items,
      Customer: this._customer,
      Purchase_Order: this._purchaseOrder,
      Order_Item: this._orderItem
    };

    if (name in modelsDictionary) {
      return modelsDictionary[name];
    }

    return null;
  }
}

const inMemoryDB = new InMemoryDatabase();

export default inMemoryDB;
