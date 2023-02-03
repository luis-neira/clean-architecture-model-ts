import { Result } from '../../lib/result';
import { ValidationError } from '@common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IOrdersGateway,
  EntityGatewayDictionary,
  IAddOrderRequestModel
} from '../interfaces';

import { RequestModelValidator } from './request-model-validator';

export default class AddOrderUseCase implements IUseCaseInputBoundary {
  private ordersRepository: IOrdersGateway;
  private presenter: IUseCaseOutputBoundary;
  private requestModelValidator: RequestModelValidator;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ordersRepository = reposByResource.orders;
    this.presenter = presenter;
    this.requestModelValidator = new RequestModelValidator(reposByResource.products, reposByResource.users)
  }

  public async execute(orderDetails: IAddOrderRequestModel): Promise<void> {
    try {
      const {
        errors,
        data,
        relationsDictionary
      } = await this.requestModelValidator.validate(orderDetails);

      if (errors.length > 0) {
        const invalid = new ValidationError('Validation Errors');
        invalid.reason = 'Bad data input';
        invalid.validationErrors = errors;
        throw invalid;
      }

      const order = await this.ordersRepository.create({
        date: data.date,
        isPaid: data.isPaid,
        meta: data.meta
      });

      order.user = relationsDictionary.user;
      order.products = relationsDictionary.products;

      await this.ordersRepository.save(order);

      this.presenter.execute(order.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
