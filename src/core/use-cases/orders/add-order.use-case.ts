import { Result } from '../../lib/result';
import { IOrder, IProduct } from '@core/entities/interfaces';
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
    const { userId, productIds, date, isPaid, meta } = requestModel;

    try {
      const order = await this.ordersRepository.create({
        userId,
        productIds,
        date,
        isPaid,
        meta
      })

      const validationErrors = await this.getValidationErrors(order);

      if (validationErrors.length > 0) {
        const invalid = new ValidationError('Validation Errors');
        invalid.reason = 'Bad data';
        invalid.validationErrors = validationErrors;
        throw invalid;
      }

      const addedOrder = await this.ordersRepository.save(order);

      this.presenter.execute(addedOrder.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }

  private async getValidationErrors(order: IOrder): Promise<IValidationError[]> {
    const notFoundProductIds = await this.getProductIdValidationErrors(order);

    const notFoundUserId = await this.getUserIdValidationError(order);

    return [...notFoundProductIds, ...notFoundUserId];
  }

  private async getProductIdValidationErrors(
    order: IOrder
  ): Promise<IValidationError[]> {
    const productIds = order.productIds as string[];

    const getProductsById = productIds.map((id: string) => {
      return this.productsRepository.findOne(id);
    });

    const foundProducts = await Promise.all(getProductsById);

    const invalidProductIds = foundProducts.reduce(
      (accum: string[], currentVal: IProduct | null, i: number) => {
        if (currentVal === null) accum.push(productIds[i]);
        return accum;
      },
      []
    );

    if (invalidProductIds.length === 0) return [] as IValidationError[];

    const returnable = [] as IValidationError[];

    returnable.push({
      field: 'productIds',
      msg: `No products with ids ${invalidProductIds.join(', ')}`
    });

    return returnable;
  }

  private async getUserIdValidationError(
    order: IOrder
  ): Promise<IValidationError[]> {
    const { userId } = order;

    const foundUser = await this.usersRepository.findOne(userId);

    if (foundUser) return [] as IValidationError[];

    const returnable = [] as IValidationError[];

    returnable.push({
      field: 'userId',
      msg: `No user with id ${userId}`
    });

    return returnable;
  }
}
