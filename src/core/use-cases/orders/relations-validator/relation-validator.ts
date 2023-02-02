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

interface IRelations {
  products: IProduct[];
  user: IUser | undefined;
}

export class RelationValidator {
  private usersRepository: IUsersGateway;
  private productsRepository: IProductsGateway;

  constructor(productsRepository: IProductsGateway, usersRepository: IUsersGateway) {
    this.usersRepository = usersRepository;
    this.productsRepository = productsRepository;
  }

  public async validate(order: IOrderDetails): Promise<[IValidationError[], IRelations]> {
    const [ productIdErrors, foundProducts ] = await this.getProductIdValidationErrors(order);

    const [ userIdErrors, foundUser ] = await this.getUserIdValidationError(order);

    return [
      [...productIdErrors, ...userIdErrors],
      { 
        products: foundProducts,
        user: foundUser
      }
    ];
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