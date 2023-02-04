import { IProduct, IUser } from '@core/entities/interfaces';

import {
  IOrderDetails,
  IProductsGateway,
  IUsersGateway,
} from '@core/use-cases/interfaces';

interface IValidationError {
  field: string;
  msg: string;
}

export class OrderValidator {
  private usersRepository: IUsersGateway;
  private productsRepository: IProductsGateway;

  constructor(productsRepository: IProductsGateway, usersRepository: IUsersGateway) {
    this.usersRepository = usersRepository;
    this.productsRepository = productsRepository;
  }

  public async processProductIds(
    productIds: string[]
  ): Promise<[IValidationError[], IProduct[]]> {

    if (productIds == null || productIds.length === 0) {
      return [ [], [] ];
    }

    const productsById = productIds.map((id: string) => {
      return this.productsRepository.findOne(id);
    });

    const foundProducts = await Promise.all(productsById);

    const validatedProducts = [] as IProduct[];

    const invalidProductIds = foundProducts.reduce(
      (accum: string[], currentVal: IProduct | null, i: number) => {
        if (currentVal === null) accum.push(productIds[i]);
        else validatedProducts.push(currentVal);
        return accum;
      },
      []
    );

    if (invalidProductIds.length === 0) {
      return [ [], validatedProducts ];
    }

    const returnable = [] as IValidationError[];

    returnable.push({
      field: 'productIds',
      msg: `No products with ids ${invalidProductIds.join(', ')}`
    });

    return [returnable, validatedProducts];
  }

  public async processUserId(
    userId: string
  ): Promise<[IValidationError[], IUser | null]> {
    if (userId == null) {
      return [ [], null ];
    }

    const foundUser = await this.usersRepository.findOne(userId);

    if (foundUser) {
      return [ [], foundUser ];
    }

    const returnable = [] as IValidationError[];

    returnable.push({
      field: 'userId',
      msg: `No user with id ${userId}`
    });

    return [ returnable, null ];
  }

  public modifyOrderDetails(
    orderDetails: IOrderDetails,
    processedProps: {
      products: IProduct[],
      user: IUser | null
    }
  ): any {
    const validated = {} as Record<string, any>;

    const clonedOrderDetails = { ...orderDetails };

    if (processedProps.products.length > 0) {
      validated.products = processedProps.products;
      Reflect.deleteProperty(clonedOrderDetails, 'productIds');
    }

    if (!!processedProps.user === true) {
      validated.user = processedProps.user;
      Reflect.deleteProperty(clonedOrderDetails, 'userId');
    }

    const input = Object.assign({}, clonedOrderDetails, validated);

    return input;
  }
}