import { GetItemsUseCase } from '../../../core/use-cases/management';
import { CreateOrderPresenter } from '../../presenters/ingram';

import { IItemsGateway } from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetItemController {
  private itemsRepository: IItemsGateway;
  private createOrderPresenter: CreateOrderPresenter;

  public constructor(
    itemsRepository: IItemsGateway,
    createdResponder: IResponder
  ) {
    this.itemsRepository = itemsRepository;
    this.createOrderPresenter = new CreateOrderPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getItemsUseCase = new GetItemsUseCase(
      this.itemsRepository,
      this.createOrderPresenter
    );

    await getItemsUseCase.execute();
  }
}
