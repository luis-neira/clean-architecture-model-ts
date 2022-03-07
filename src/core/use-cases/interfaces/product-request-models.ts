interface IProductID {
  id: string;
}

export interface IProductDetails {
  name: string;
  description: string;
  images: string[];
  price: number;
  color: string;
  meta: any;
}

export interface IAddProductRequestModel extends IProductDetails {}

export interface IDeleteProductRequestModel extends IProductID {}

export interface IGetProductByIdRequestModel extends IProductID {}

export interface IUpdateOrCreateProductRequestModel extends IProductID {
  productDetails: IProductDetails;
}
