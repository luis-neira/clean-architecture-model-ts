type ModelName = 'User' | 'Product' | 'Order';

export class InMemoryDatabase {
  private _users: any[];
  private _products: any[];
  private _orders: any[];

  public constructor() {
    this._users = [];
    this._products = [];
    this._orders = [];

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
      Order: this._orders
    };

    if (name in modelsDictionary) {
      return modelsDictionary[name];
    }

    return null;
  }
}

const inMemoryDB = new InMemoryDatabase();

export default inMemoryDB;
