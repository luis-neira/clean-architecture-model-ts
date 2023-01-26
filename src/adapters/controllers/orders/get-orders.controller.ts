import { GetOrdersUseCase } from '@core/use-cases/orders';
import { GetOrdersPresenter } from '@adapters/presenters/orders';

import { IOrdersGateway } from '@core/use-cases/interfaces';
import { IResponder, IHttpRequestModel } from '../interfaces';

export default class GetOrdersController {
  private ordersRepository: IOrdersGateway;
  private getOrdersPresenter: GetOrdersPresenter;

  public constructor(
    ordersRepository: IOrdersGateway,
    okResponder: IResponder
  ) {
    this.ordersRepository = ordersRepository;
    this.getOrdersPresenter = new GetOrdersPresenter(okResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getOrdersUseCase = new GetOrdersUseCase(
      this.ordersRepository,
      this.getOrdersPresenter
    );

    await getOrdersUseCase.execute();
  }
}
