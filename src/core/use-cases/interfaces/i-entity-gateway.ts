import {
  User,
  Product,
  Order,
  Image,
  Item,
  Customer,
  PurchaseOrder,
  OrderItem
} from '../../entities';

interface IWrite<T> {
  create(entity: T): Promise<T>;
  update(entity: T, context: { id: string }): Promise<T | null>;
  delete(id: string): Promise<true | null>;
}

interface IRead<T> {
  find(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
}

export default interface IEntityGateway extends IWrite<any>, IRead<any> {}

export type EntityGatewayDictionary = Record<string, IEntityGateway>;

export interface IUsersGateway extends IWrite<User>, IRead<User> {}

export interface IProductsGateway extends IWrite<Product>, IRead<Product> {}

export interface IOrdersGateway extends IWrite<Order>, IRead<Order> {}

export interface IImagesGateway extends IWrite<Image>, IRead<Image> {}

export interface IItemsGateway extends IWrite<Item>, IRead<Item> {
  putMany(entity: Item[]): Promise<boolean>;
}

export interface ICustomersGateway extends IWrite<Customer>, IRead<Customer> {
  putMany(entity: Customer[]): Promise<boolean>;
}

export interface IPurchaseOrdersGateway
  extends IWrite<PurchaseOrder>,
    IRead<PurchaseOrder> {
  createMany(entity: PurchaseOrder[]): Promise<boolean>;
}

export interface IOrderItemsGateway
  extends IWrite<OrderItem>,
    IRead<OrderItem> {
  createMany(entity: OrderItem[]): Promise<boolean>;
}
