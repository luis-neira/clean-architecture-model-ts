import { Customer } from '../../../../../core/entities';
import { InMemoryDatabase } from '../in-memory';

import { DatabaseRepository } from '../../interfaces';
import { ICustomersGateway } from '../../../../../core/use-cases/interfaces';

export default class CustomersRepository
  extends DatabaseRepository
  implements ICustomersGateway
{
  private _model: any[];

  public constructor() {
    super();
    this._model = (this._db as InMemoryDatabase).getModel('Customer')!;
  }

  public async create(customer: Customer): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async putMany(customers: Customer[]): Promise<boolean> {
    const rawCustomers = customers.map((c) => c.getProps());

    rawCustomers.forEach((c) => {
      const foundCustomer = this._model.find(
        (el) => el.customer_id === c.customer_id
      );
      const foundIndex = this._model.findIndex(
        (el) => el.customer_id === c.customer_id
      );

      if (!foundCustomer) return this._model.push(c);

      this._model[foundIndex] = foundCustomer;
    });

    return true;
  }

  public async update(
    customer: Customer,
    context: { id: string }
  ): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async delete(id: string): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async findOne(id: string): Promise<Customer | null> {
    const foundCustomer = this._model.find((c) => c.customer_id === id);

    if (!foundCustomer) return null;

    return Customer.create(foundCustomer, null);
  }

  public async find(): Promise<Customer[]> {
    return this._model;
  }
}
