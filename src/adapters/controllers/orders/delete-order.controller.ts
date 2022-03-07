import { IHttpRequestModel } from '../interfaces';

import { DeleteOrderUseCase } from '../../../core/use-cases/orders';
import { DeleteOrderPresenter } from '../../../adapters/presenters/orders';

import { IOrdersGateway } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class DeleteOrderController {
  private ordersRepository: IOrdersGateway;
  private deleteOrderPresenter: DeleteOrderPresenter;

  public constructor(
    ordersRepository: IOrdersGateway,
    noContentResponder: IResponder
  ) {
    this.ordersRepository = ordersRepository;
    this.deleteOrderPresenter = new DeleteOrderPresenter(noContentResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      id: req.params.id
    };

    const deleteOrderUseCase = new DeleteOrderUseCase(
      this.ordersRepository,
      this.deleteOrderPresenter
    );

    await deleteOrderUseCase.execute(useCaseRequestModel);
  }
}
