import { Result } from '@core/lib/result';
import { ValidationError } from '@common/errors';
import { ValueNotFoundError } from '../../../common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IOrdersGateway,
  EntityGatewayDictionary,
  IUpdateOrderRequestModel,
} from '../interfaces';

import { RequestModelValidator } from './request-model-validator';
import { OrderValidator } from './order-validator';

export default class UpdateOrderUseCase
  implements IUseCaseInputBoundary
{
  private ordersRepository: IOrdersGateway;
  private presenter: IUseCaseOutputBoundary;
  private requestModelValidator: RequestModelValidator;
  private orderValidator: OrderValidator;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    presenter: IUseCaseOutputBoundary,
  ) {
    this.ordersRepository = reposByResource.orders;
    this.presenter = presenter;
    this.requestModelValidator = new RequestModelValidator(reposByResource.products, reposByResource.users)
    this.orderValidator = new OrderValidator(reposByResource.products, reposByResource.users);
  }

  public async execute({
    id,
    orderDetails
  }: IUpdateOrderRequestModel): Promise<void> {
    try {
    const foundOrder = await this.ordersRepository.findOne(id);

    if (foundOrder === null) {
      throw new ValueNotFoundError(`productId '${id}' not found`);
    }

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
      invalid.reason = 'Bad data';
      invalid.validationErrors = errors;
      throw invalid;
    }

    const moddedOrderDetails = this.orderValidator.modifyOrderDetails(orderDetails, {
      products,
      user
    });

    const updatedOrder = this.ordersRepository.update(foundOrder, moddedOrderDetails);

    await this.ordersRepository.save(updatedOrder);

    this.presenter.execute(updatedOrder.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
