interface IOrderID {
  id: string;
}

export interface IOrderDetails {
  userId: string;
  productIds: string[];
  date: Date;
  isPaid: boolean;
  meta: any;
}

export interface IAddOrderRequestModel extends IOrderDetails {}

export interface IDeleteOrderRequestModel extends IOrderID {}

export interface IGetOrderByIdRequestModel extends IOrderID {}

export interface IUpdateOrderRequestModel extends IOrderID {
  orderDetails: IOrderDetails;
}
