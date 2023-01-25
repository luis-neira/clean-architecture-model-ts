import { IHttpRequestModel } from '../interfaces';

import { UpdateOrderUseCase } from '../../../core/use-cases/orders';
import { UpdateOrderPresenter } from '../../presenters/orders';

import { EntityGatewayDictionary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class UpdateOrderController {
  private reposByResource: EntityGatewayDictionary;
  private UpdateOrderPresenter: UpdateOrderPresenter;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    createdResponder: IResponder
  ) {
    this.reposByResource = reposByResource;
    this.UpdateOrderPresenter = new UpdateOrderPresenter(
      createdResponder
    );
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      id: req.params.id,
      orderDetails: req.body
    };

    const updateOrderUseCase = new UpdateOrderUseCase(
      this.reposByResource,
      this.UpdateOrderPresenter
    );

    await updateOrderUseCase.execute(useCaseRequestModel);
  }
}
