export interface IOrderStatusCredentials {
  account: string;
  order_id: string;
  ingram_order_id: string;
}

export interface IGetIngramOrderStatusRequestModel {
  order_status: [
    {
      order: IOrderStatusCredentials;
    }
  ];
}
