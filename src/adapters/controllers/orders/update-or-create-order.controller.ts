import { IHttpRequestModel } from '../interfaces';

import { UpdateOrCreateOrderUseCase } from '../../../core/use-cases/orders';
import { UpdateOrCreateOrderPresenter } from '../../presenters/orders';

import { EntityGatewayDictionary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class UpdateOrCreateOrderController {
  private reposByResource: EntityGatewayDictionary;
  private updateOrCreateOrderPresenter: UpdateOrCreateOrderPresenter;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    createdResponder: IResponder
  ) {
    this.reposByResource = reposByResource;
    this.updateOrCreateOrderPresenter = new UpdateOrCreateOrderPresenter(
      createdResponder
    );
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      id: req.params.id,
      orderDetails: req.body
    };

    const updateOrCreateOrderUseCase = new UpdateOrCreateOrderUseCase(
      this.reposByResource,
      this.updateOrCreateOrderPresenter
    );

    await updateOrCreateOrderUseCase.execute(useCaseRequestModel);
  }
}
