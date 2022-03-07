import { GetOrdersUseCase } from '../../../core/use-cases/management';
import { CreateOrderPresenter } from '../../presenters/ingram';

import { IPurchaseOrdersGateway } from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetOrdersController {
  private ordersRepository: IPurchaseOrdersGateway;
  private createOrderPresenter: CreateOrderPresenter;

  public constructor(
    ordersRepository: IPurchaseOrdersGateway,
    createdResponder: IResponder
  ) {
    this.ordersRepository = ordersRepository;
    this.createOrderPresenter = new CreateOrderPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getOrdersUseCase = new GetOrdersUseCase(
      this.ordersRepository,
      this.createOrderPresenter
    );

    await getOrdersUseCase.execute();
  }
}
