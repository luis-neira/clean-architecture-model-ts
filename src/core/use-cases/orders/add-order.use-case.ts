import { Result } from '@core/lib/result';
import { ValidationError } from '@common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IOrdersGateway,
  EntityGatewayDictionary,
  IAddOrderRequestModel
} from '../interfaces';

import { OrderValidator } from './order-validator';

export default class AddOrderUseCase implements IUseCaseInputBoundary {
  private ordersRepository: IOrdersGateway;
  private presenter: IUseCaseOutputBoundary;
  private orderValidator: OrderValidator;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ordersRepository = reposByResource.orders;
    this.presenter = presenter;
    this.orderValidator = new OrderValidator(reposByResource.products, reposByResource.users);
  }

  public async execute(orderDetails: IAddOrderRequestModel): Promise<void> {
    try {
      const [
        productIdErrors,
        products
      ] = await this.orderValidator.processProductIds(orderDetails.productIds);
  
      const [
        userIdErrors,
        user
      ] = await this.orderValidator.processUserId(orderDetails.userId);

      const errors = [ ...productIdErrors, ...userIdErrors ];

      if (errors.length > 0) {
        const invalid = new ValidationError('Validation Errors');
        invalid.reason = 'Bad data input';
        invalid.validationErrors = errors;
        throw invalid;
      }

      const moddedOrderDetails = this.orderValidator.modifyOrderDetails(orderDetails, {
        products,
        user
      });

      const order = this.ordersRepository.create(moddedOrderDetails);

      await this.ordersRepository.save(order);

      this.presenter.execute(order.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
