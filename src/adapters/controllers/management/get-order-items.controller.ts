import { GetOrderItemsUseCase } from '../../../core/use-cases/management';
import { GetOrderItemsPresenter } from '../../presenters/management';

import { IOrderItemsGateway } from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetOrderItemsController {
  private orderItemsRepository: IOrderItemsGateway;
  private getOrderItemsPresenter: GetOrderItemsPresenter;

  public constructor(
    orderItemsRepository: IOrderItemsGateway,
    createdResponder: IResponder
  ) {
    this.orderItemsRepository = orderItemsRepository;
    this.getOrderItemsPresenter = new GetOrderItemsPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getOrderItemsUseCase = new GetOrderItemsUseCase(
      this.orderItemsRepository,
      this.getOrderItemsPresenter
    );

    await getOrderItemsUseCase.execute();
  }
}
