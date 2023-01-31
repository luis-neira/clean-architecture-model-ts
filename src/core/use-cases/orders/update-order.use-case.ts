import { Result } from '../../lib/result';
import { ValidationError } from '@common/errors';
import { Order, Product } from '../../entities';
import { ValueNotFoundError } from '../../../common/errors'
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
import { IUpdateOrderRequestModel, IOrderDetails } from '../interfaces';

interface IValidationError {
  field: string;
  msg: string;
}

export default class UpdateOrderUseCase
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

  public async execute({
    id,
    orderDetails
  }: IUpdateOrderRequestModel): Promise<void> {
    try {
      const foundOrder = await this.ordersRepository.findOne(id);

      if (foundOrder === null) {
        throw new ValueNotFoundError(`orderId '${id}' not found`);
      }

      const modifiedOrderDetails = Object.assign(
        foundOrder.toJSON(),
        orderDetails
      );

      await this.addOrderUseCase(modifiedOrderDetails, id);
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
        isPaid: orderDetails.isPaid,
        meta: orderDetails.meta
      },
      orderIdOrNull
    );

    const validationErrors = await this.getValidationErrors(order);

    if (validationErrors.length > 0) {
      const invalid = new ValidationError('Validation Errors');
      invalid.reason = 'Bad data';
      invalid.validationErrors = validationErrors;
      throw invalid;
    }

    const addedOrder = await this.ordersRepository.update(order, {
      id: order.id
    });

    const addedOrderDto = this.dataMapper.toDTO(addedOrder!);

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

    const invalidProductIds = foundProducts.reduce(
      (accum: string[], currentVal: Product | null, i: number) => {
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
