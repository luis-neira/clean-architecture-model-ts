import { Result } from '../../lib/result';
import { ValidationError } from '@common/errors';
import { IProduct, IUser } from '@core/entities/interfaces';
import { ValueNotFoundError } from '../../../common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IProductsGateway,
  IUsersGateway,
  IOrdersGateway,
  EntityGatewayDictionary
} from '../interfaces';
import { IUpdateOrderRequestModel, IOrderDetails } from '../interfaces';

interface IValidationError {
  field: string;
  msg: string;
}

interface IRelations {
  products: IProduct[];
  user: IUser | undefined;
}

export default class UpdateOrderUseCase
  implements IUseCaseInputBoundary
{
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

  public async execute({
    id,
    orderDetails
  }: IUpdateOrderRequestModel): Promise<void> {
    try {
      await this.addOrderUseCase(orderDetails, id);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }

  private async addOrderUseCase(orderDetails: IOrderDetails, orderId: string) {
    const [ validationErrors, relationDict ] = await this.validateRelations(orderDetails);

    if (validationErrors.length > 0) {
      const invalid = new ValidationError('Validation Errors');
      invalid.reason = 'Bad data';
      invalid.validationErrors = validationErrors;
      throw invalid;
    }

    const updatedOrder = await this.ordersRepository.update(orderDetails, {
      id: orderId
    });

    if (updatedOrder === null) {
      throw new ValueNotFoundError(`orderId '${orderId}' not found`);
    }

    if (relationDict.user) {
      updatedOrder.user = relationDict.user;
    }

    const savedOrder = await this.ordersRepository.save(updatedOrder);


    this.presenter.execute(savedOrder.toJSON());
  }

  private async validateRelations(order: IOrderDetails): Promise<[IValidationError[], IRelations]> {
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
