import { Result } from '../../lib/result';
import { ValidationError } from '@common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IOrdersGateway,
  EntityGatewayDictionary,
  IAddOrderRequestModel
} from '../interfaces';

import { RelationValidator } from './relations-validator';

export default class AddOrderUseCase implements IUseCaseInputBoundary {
  private ordersRepository: IOrdersGateway;
  private presenter: IUseCaseOutputBoundary;
  private validateRelations: RelationValidator;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ordersRepository = reposByResource.orders;
    this.presenter = presenter;
    this.validateRelations = new RelationValidator(reposByResource.products, reposByResource.users)
  }

  public async execute(requestModel: IAddOrderRequestModel): Promise<void> {
    try {
      const [ validationErrors, relationDictionary ] = await this.validateRelations.validate(requestModel);

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

      order.user = relationDictionary.user;

      const addedOrder = await this.ordersRepository.save(order);

      this.presenter.execute(addedOrder.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
