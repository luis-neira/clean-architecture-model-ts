import {
  User,
  Product,
  Order,
  Image,
  Credentials,
  AuthToken,
  IngramProduct,
  IngramProductPrice,
  IngramOrder,
  IngramOrderStatus,
  Item,
  Customer,
  PurchaseOrder,
  OrderItem
} from '../../entities';

import * as constants from '../../../config/constants';

import { IOrderStatusCredentials } from '../../use-cases/interfaces';

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

export interface ICredentialsGateway extends IWrite<Credentials> {
  authenticate(entity: Credentials): Promise<AuthToken>;
}

export type IngramCategories =
  | typeof constants.INGRAM_GAMES
  | typeof constants.INGRAM_GAMES
  | typeof constants.INGRAM_AUDIO
  | typeof constants.INGRAM_ELECTRONICS
  | typeof constants.INGRAM_ACCESSORIES;

export type IngramItemFormats =
  | typeof constants.INGRAM_DVD
  | typeof constants.INGRAM_BLURAY
  | typeof constants.INGRAM_CD
  | typeof constants.INGRAM_LP;

export interface IIngramItemNotFound {
  item_not_available: string;
}

export interface IIngramProductsGateway extends IRead<IngramProduct> {
  findByCategory(category: IngramCategories): Promise<IngramProduct[]>;
  findByItemFormat(itemFormat: IngramItemFormats): Promise<IngramProduct[]>;
}

export interface IIngramProductPricesGateway
  extends IRead<IngramProductPrice> {}

export interface IIngramOrdersGateway
  extends IWrite<IngramOrder | IngramOrderStatus[]>,
    IRead<IngramOrder> {
  createMany(
    entity: IngramOrder[]
  ): Promise<{ orderStatus: IngramOrderStatus[] }[]>;
}

export interface IIngramOrderStatusGateway extends IRead<IngramOrderStatus> {
  findByContext(
    context: IOrderStatusCredentials
  ): Promise<IngramOrderStatus[] | null>;
}
