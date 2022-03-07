import { IHttpRequestModel } from '../interfaces';

import { AddOrderUseCase } from '../../../core/use-cases/orders';
import { AddOrderPresenter } from '../../../adapters/presenters/orders';

import { EntityGatewayDictionary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class AddOrderController {
  private reposByResource: EntityGatewayDictionary;
  private addOrderPresenter: AddOrderPresenter;

  public constructor(
    reposByResource: EntityGatewayDictionary,
    createdResponder: IResponder
  ) {
    this.reposByResource = reposByResource;
    this.addOrderPresenter = new AddOrderPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = req.body;

    const addOrderUseCase = new AddOrderUseCase(
      this.reposByResource,
      this.addOrderPresenter
    );

    await addOrderUseCase.execute(useCaseRequestModel);
  }
}
