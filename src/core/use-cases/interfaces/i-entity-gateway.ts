import { User, Product, Order, Image } from '../../entities';

interface IWrite<T> {
  save(entity: T): Promise<T>;
  update(entity: T, context: { id: string }): Promise<T | null>;
  delete(id: string): Promise<true | null>;
}

interface IRead<T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
}

export default interface IEntityGateway extends IWrite<any>, IRead<any> {}

export type EntityGatewayDictionary = Record<string, IEntityGateway>;

export interface IUsersGateway extends IWrite<User>, IRead<User> {}

export interface IProductsGateway extends IWrite<Product>, IRead<Product> {}

export interface IOrdersGateway extends IWrite<Order>, IRead<Order> {}

export interface IImagesGateway extends IWrite<Image>, IRead<Image> {}
