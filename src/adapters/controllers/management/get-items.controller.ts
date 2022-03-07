import { GetItemsUseCase } from '../../../core/use-cases/management';
import { GetItemsPresenter } from '../../presenters/management';

import { IItemsGateway } from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetItemController {
  private itemsRepository: IItemsGateway;
  private getItemsPresenter: GetItemsPresenter;

  public constructor(
    itemsRepository: IItemsGateway,
    createdResponder: IResponder
  ) {
    this.itemsRepository = itemsRepository;
    this.getItemsPresenter = new GetItemsPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getItemsUseCase = new GetItemsUseCase(
      this.itemsRepository,
      this.getItemsPresenter
    );

    await getItemsUseCase.execute();
  }
}
