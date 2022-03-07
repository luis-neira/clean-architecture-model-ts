import { GetOrderItemsUseCase } from '../../../core/use-cases/management';
import { CreateOrderPresenter } from '../../presenters/ingram';

import { IOrderItemsGateway } from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetOrderItemsController {
  private orderItemsRepository: IOrderItemsGateway;
  private createOrderPresenter: CreateOrderPresenter;

  public constructor(
    orderItemsRepository: IOrderItemsGateway,
    createdResponder: IResponder
  ) {
    this.orderItemsRepository = orderItemsRepository;
    this.createOrderPresenter = new CreateOrderPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getOrderItemsUseCase = new GetOrderItemsUseCase(
      this.orderItemsRepository,
      this.createOrderPresenter
    );

    await getOrderItemsUseCase.execute();
  }
}
