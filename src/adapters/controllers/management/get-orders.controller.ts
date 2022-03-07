import { GetOrdersUseCase } from '../../../core/use-cases/management';
import { GetOrdersPresenter } from '../../presenters/management';

import { IPurchaseOrdersGateway } from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetOrdersController {
  private ordersRepository: IPurchaseOrdersGateway;
  private getOrdersPresenter: GetOrdersPresenter;

  public constructor(
    ordersRepository: IPurchaseOrdersGateway,
    createdResponder: IResponder
  ) {
    this.ordersRepository = ordersRepository;
    this.getOrdersPresenter = new GetOrdersPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getOrdersUseCase = new GetOrdersUseCase(
      this.ordersRepository,
      this.getOrdersPresenter
    );

    await getOrdersUseCase.execute();
  }
}
