import { Image } from '../../entities';
import { IUser, IProduct, IOrder } from '@core/entities/interfaces';

interface IContext {
  id: string;
  [key: string]: any;
}

interface IWrite<T> {
  create(input: any): Promise<T>;
  save(entity?: T | T[]): Promise<T>;
  update(input: any, context: IContext): Promise<T | null>;
  remove(id: string): Promise<true | null>;
}

interface IRead<T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
}

export default interface IEntityGateway extends IWrite<any>, IRead<any> {}

export interface IUsersGateway extends IWrite<IUser>, IRead<IUser> {
  findAllUsersWithOrders(): Promise<IUser[]>
  findOneUserWithOrder(id: string): Promise<IUser | null>
}

export interface IProductsGateway extends IWrite<IProduct>, IRead<IProduct> {}

export interface IOrdersGateway extends IWrite<IOrder>, IRead<IOrder> {}

export interface IImagesGateway extends Omit<IWrite<Image>, 'create'>, IRead<Image> {}

export interface EntityGatewayDictionary {
  users: IUsersGateway;
  products: IProductsGateway;
  orders: IOrdersGateway;
  images?: IImagesGateway;
};
