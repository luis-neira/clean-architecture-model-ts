import { IHttpRequestModel } from '../interfaces';

import { GetOrderByIdUseCase } from '../../../core/use-cases/orders';
import { GetOrderByIdPresenter } from '../../../adapters/presenters/orders';

import { IOrdersGateway } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class GetOrderByIdController {
  private ordersRepository: IOrdersGateway;
  private getOrderByIdPresenter: GetOrderByIdPresenter;

  public constructor(ordersRepository: IOrdersGateway, okResponder: IResponder) {
    this.ordersRepository = ordersRepository;
    this.getOrderByIdPresenter = new GetOrderByIdPresenter(okResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      id: req.params.id
    };

    const getOrderByIdUseCase = new GetOrderByIdUseCase(
      this.ordersRepository,
      this.getOrderByIdPresenter
    );

    await getOrderByIdUseCase.execute(useCaseRequestModel);
  }
}
