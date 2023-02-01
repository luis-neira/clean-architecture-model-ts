import { Result } from '../../lib/result';
import { IOrder, IProduct, IUser } from '@core/entities/interfaces';
import { ValidationError } from '@common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IProductsGateway,
  IUsersGateway,
  IOrdersGateway,
  EntityGatewayDictionary
} from '../interfaces';
import { IAddOrderRequestModel } from '../interfaces';

interface IValidationError {
  field: string;
  msg: string;
}

interface IRelations {
  products: IProduct[];
  user: IUser | undefined;
}

export default class AddOrderUseCase implements IUseCaseInputBoundary {
  private ordersRepository: IOrdersGateway;
  private usersRepository: IUsersGateway;
  private productsRepository: IProductsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ordersRepository = reposByResource.orders;
    this.usersRepository = reposByResource.users;
    this.productsRepository = reposByResource.products;
    this.presenter = presenter;
  }

  public async execute(requestModel: IAddOrderRequestModel): Promise<void> {
    try {
      const [ validationErrors, relationDict ] = await this.validateRelations(requestModel);

      if (validationErrors.length > 0) {
        const invalid = new ValidationError('Validation Errors');
        invalid.reason = 'Bad data input';
        invalid.validationErrors = validationErrors;
        throw invalid;
      }

      const order = await this.ordersRepository.create({
        productIds: requestModel.productIds,
        date: requestModel.date,
        isPaid: requestModel.isPaid,
        meta: requestModel.meta
      });

      order.user = relationDict.user;

      const addedOrder = await this.ordersRepository.save(order);

      this.presenter.execute(addedOrder.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }

  private async validateRelations(order: IAddOrderRequestModel): Promise<[IValidationError[], IRelations]> {
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
    order: IAddOrderRequestModel
  ): Promise<[IValidationError[], IProduct[]]> {

    if (order.productIds == null) {
      return [ [], [] ];
    }
    
    const productIds = order.productIds;

    const productsById = productIds.map((id) => {
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
    order: IAddOrderRequestModel
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
