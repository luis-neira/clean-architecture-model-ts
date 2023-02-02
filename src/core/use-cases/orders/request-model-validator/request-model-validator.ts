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

export interface IRelations {
  products: IProduct[];
  user: IUser | undefined;
}

export class RequestModelValidator {
  private usersRepository: IUsersGateway;
  private productsRepository: IProductsGateway;

  constructor(productsRepository: IProductsGateway, usersRepository: IUsersGateway) {
    this.usersRepository = usersRepository;
    this.productsRepository = productsRepository;
  }

  public async validate(order: IOrderDetails): Promise<{
    errors: IValidationError[],
    relationsDictionary: IRelations,
    data: any
  }> {

    const processedOrder = { ...order };

    const [ productIdErrors, foundProducts ] = await this.getProductIdValidationErrors(processedOrder);

    const [ userIdErrors, foundUser ] = await this.getUserIdValidationError(processedOrder);

    if (processedOrder.productIds) {
      Reflect.deleteProperty(processedOrder, 'productIds')
    }

    if (processedOrder.userId) {
      Reflect.deleteProperty(processedOrder, 'userId')
    }

    return {
      errors: [ ...productIdErrors, ...userIdErrors ],
      relationsDictionary: { 
        products: foundProducts,
        user: foundUser
      },
      data: processedOrder
    };
  }

  private async getProductIdValidationErrors(
    order: IOrderDetails
  ): Promise<[IValidationError[], IProduct[]]> {

    if (order.productIds == null) {
      return [ [], [] ];
    }

    const productIds = order.productIds;

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

  private async getUserIdValidationError(
    order: IOrderDetails
  ): Promise<[IValidationError[], IUser | undefined]> {
    const { userId } = order;

    if (userId == null) {
      return [ [], undefined ];
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

    return [ returnable, undefined ];
  }
}