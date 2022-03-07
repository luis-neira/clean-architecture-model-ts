import { DatabaseClient } from '../index';
import { DatabaseConnection } from '../interfaces';

// export interface IRepository {
//   add(value: any): Promise<any>;

//   getById(value: any): Promise<any>;

//   update(value: any): Promise<any>;

//   delete(value: any): Promise<any>;
// }

export default abstract class DatabaseRepository {
  protected _db?: DatabaseConnection;

  public constructor() {
    const databaseClient = DatabaseClient.getInstance();
    this._db = databaseClient.getConnection();
  }

  // public abstract add(order: any): Promise<any>;

  // public abstract getById(orderId: any): Promise<any>;

  // public abstract update(newRawOrderData: any): Promise<any>;

  // public abstract delete(rawOrderData: any): Promise<any>;
}
