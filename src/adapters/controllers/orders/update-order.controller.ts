import { UpdateOrderUseCase } from '@core/use-cases/orders';
import { UpdateOrderPresenter } from '@adapters/presenters/orders';

import { EntityGatewayDictionary, IUpdateOrderRequestModel } from '@core/use-cases/interfaces';
import { IResponder, IValidator, IHttpRequestModel } from '../interfaces';

export default class UpdateOrderController {
  private reposByResource: EntityGatewayDictionary;
  private UpdateOrderPresenter: UpdateOrderPresenter;
  private validation: IValidator;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    createdResponder: IResponder,
    validation: IValidator
  ) {
    this.reposByResource = reposByResource;
    this.UpdateOrderPresenter = new UpdateOrderPresenter(
      createdResponder
    );
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IUpdateOrderRequestModel>({
      id: req.params.id,
      orderDetails: req.body
    });

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const updateOrderUseCase = new UpdateOrderUseCase(
      this.reposByResource,
      this.UpdateOrderPresenter
    );

    await updateOrderUseCase.execute(useCaseRequestModel);
  }
}
