// import { IIngramOrderItemProps } from '../../entities';

// interface IIngramOrderID {
//   id: string;
// }

export interface ILineItem {
  customer_id: string;
  account: string;
  order_id: string;
  item_desc: string;
  item_number: string;
  upc: string;
  price: number;
  qty: number;
  ship_to_name: string;
  ship_address1: string;
  ship_address2: string;
  ship_city: string;
  ship_state: string;
  ship_country: string;
  ship_zip: string;
  carrier_code: string;
  service_class: string;
  email: string;
  ship_phone: string;
}

export interface ICreateIngramOrderRequestModel {
  orders: [
    {
      lineItems: ILineItem[];
    }
  ];
}

// export interface IDeleteOrderRequestModel extends IIngramOrderID {}

// export interface IGetOrderByIdRequestModel extends IIngramOrderID {}

// export interface IUpdateOrCreateOrderRequestModel extends IIngramOrderID {
//   orderDetails: IIngramOrderDetails;
// }
