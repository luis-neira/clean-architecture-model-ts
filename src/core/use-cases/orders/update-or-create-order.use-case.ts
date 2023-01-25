import { Result } from '../../lib/result';
import { ValidationError } from '../../../common/errors';
import { Order } from '../../entities';
import { OrderMapper } from '../../mappers/order';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IOrderDto } from '../../dtos/order'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IProductsGateway,
  IUsersGateway,
  IOrdersGateway,
  EntityGatewayDictionary
} from '../interfaces';
import { IUpdateOrCreateOrderRequestModel, IOrderDetails } from '../interfaces';

interface IValidationError {
  field: string;
  msg: string;
}

export default class UpdateOrCreateOrderUseCase
  implements IUseCaseInputBoundary
{
  private ordersRepository: IOrdersGateway;
  private usersRepository: IUsersGateway;
  private productsRepository: IProductsGateway;
  private presenter: IUseCaseOutputBoundary;
  private dataMapper: IEntityMapper<Order, IOrderDto>;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ordersRepository = reposByResource.orders;
    this.usersRepository = reposByResource.users;
    this.productsRepository = reposByResource.products;
    this.presenter = presenter;
    this.dataMapper = new OrderMapper();
  }

  public async execute(
    requestModel: IUpdateOrCreateOrderRequestModel
  ): Promise<void> {
    const { id, orderDetails } = requestModel;

    try {
      const foundOrder = await this.ordersRepository.findOne(id);

      if (foundOrder === null) {
        await this.addOrderUseCase(orderDetails, id);
        return;
      }

      const orderCandidate = Order.create(orderDetails, id);

      const updatedOrder = await this.ordersRepository.update(orderCandidate, {
        id
      });

      const updatedOrderDto = this.dataMapper.toDTO(updatedOrder!);

      this.presenter.execute(updatedOrderDto);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }

  private async addOrderUseCase(orderDetails: IOrderDetails, orderId?: string) {
    const orderIdOrNull = orderId ? orderId : null;

    const order = Order.create(
      {
        userId: orderDetails.userId,
        productIds: orderDetails.productIds,
        date: orderDetails.date,
        isPayed: orderDetails.isPayed,
        meta: orderDetails.meta
      },
      orderIdOrNull
    );

    const validationErrors = await this.getValidationErrors(order);

    if (validationErrors.length > 0) {
      const invalid = new ValidationError('Validation Errors');
      invalid.reason = 'Bad data';
      invalid.validationErrors = validationErrors;
      throw Result.fail(invalid);
    }

    const addedOrder = await this.ordersRepository.create(order);

    const addedOrderDto = this.dataMapper.toDTO(addedOrder);

    this.presenter.execute(addedOrderDto);
  }

  private async getValidationErrors(order: Order): Promise<IValidationError[]> {
    const notFoundProductIds = await this.getProductIdValidationErrors(order);

    const notFoundUserId = await this.getUserIdValidationError(order);

    return [...notFoundProductIds, ...notFoundUserId];
  }

  private async getProductIdValidationErrors(
    order: Order
  ): Promise<IValidationError[]> {
    const productIds = order.productIds as string[];

    const getProductsById = productIds.map((id: string) => {
      return this.productsRepository.findOne(id);
    });

    const foundProducts = await Promise.all(getProductsById);

    const invalidProductIds = foundProducts.map((p: any, i: number) => {
      if (p === null) return productIds[i];
    });

    if (invalidProductIds.length === 0) return [] as IValidationError[];

    const returnable = [] as IValidationError[];

    returnable.push({
      field: 'productIds',
      msg: `No products with ids ${invalidProductIds.join(', ')}`
    });

    return returnable;
  }

  private async getUserIdValidationError(
    order: Order
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
