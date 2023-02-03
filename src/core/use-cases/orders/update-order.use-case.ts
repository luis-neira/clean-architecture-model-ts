import { Result } from '../../lib/result';
import { ValidationError } from '@common/errors';
// import { ValueNotFoundError } from '../../../common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IOrdersGateway,
  EntityGatewayDictionary,
  IUpdateOrderRequestModel,
} from '../interfaces';

import { RequestModelValidator } from './request-model-validator';

export default class UpdateOrderUseCase
  implements IUseCaseInputBoundary
{
  private ordersRepository: IOrdersGateway;
  private presenter: IUseCaseOutputBoundary;
  private requestModelValidator: RequestModelValidator;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    presenter: IUseCaseOutputBoundary,
  ) {
    this.ordersRepository = reposByResource.orders;
    this.presenter = presenter;
    this.requestModelValidator = new RequestModelValidator(reposByResource.products, reposByResource.users)
  }

  public async execute({
    id,
    orderDetails
  }: IUpdateOrderRequestModel): Promise<void> {
    try {
    const {
      errors,
      data,
      relationsDictionary
    } = await this.requestModelValidator.validate(orderDetails);
    
    if (errors.length > 0) {
      const invalid = new ValidationError('Validation Errors');
      invalid.reason = 'Bad data';
      invalid.validationErrors = errors;
      throw invalid;
    }

    const foundOrder = await this.ordersRepository.findOne(id);

    for (const key in relationsDictionary) {
      if (Object.prototype.hasOwnProperty.call(relationsDictionary, key)) {
        const el = relationsDictionary[key as 'user' | 'products'];
         if (el == null) {
          Reflect.deleteProperty(relationsDictionary, key);
         }
      }
    }

    const input = Object.assign({}, data, relationsDictionary);

    const updatedOrder = this.ordersRepository.update(foundOrder!, input);

    await this.ordersRepository.save(updatedOrder);

    this.presenter.execute(updatedOrder.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
