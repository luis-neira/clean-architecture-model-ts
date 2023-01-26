import { AddOrderUseCase } from '@core/use-cases/orders';
import { AddOrderPresenter } from '../../presenters/orders';

import { EntityGatewayDictionary, IAddOrderRequestModel } from '@core/use-cases/interfaces';
import { IResponder, IValidator, IHttpRequestModel } from '../interfaces';

export default class AddOrderController {
  private reposByResource: EntityGatewayDictionary;
  private addOrderPresenter: AddOrderPresenter;
  private validation: IValidator;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    createdResponder: IResponder,
    validation: IValidator
  ) {
    this.reposByResource = reposByResource;
    this.addOrderPresenter = new AddOrderPresenter(createdResponder);
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IAddOrderRequestModel>(
      req.body
    );

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const addOrderUseCase = new AddOrderUseCase(
      this.reposByResource,
      this.addOrderPresenter
    );

    await addOrderUseCase.execute(useCaseRequestModel);
  }
}
