import { DeleteOrderUseCase } from '@core/use-cases/orders';
import { DeleteOrderPresenter } from '@adapters/presenters/orders';

import { IOrdersGateway, IDeleteOrderRequestModel } from '@core/use-cases/interfaces';
import { IResponder, IValidator, IHttpRequestModel } from '../interfaces';

export default class DeleteOrderController {
  private ordersRepository: IOrdersGateway;
  private deleteOrderPresenter: DeleteOrderPresenter;
  private validation: IValidator;

  public constructor(
    ordersRepository: IOrdersGateway,
    noContentResponder: IResponder,
    validation: IValidator
  ) {
    this.ordersRepository = ordersRepository;
    this.deleteOrderPresenter = new DeleteOrderPresenter(noContentResponder);
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IDeleteOrderRequestModel>({
      id: req.params.id
    });

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const deleteOrderUseCase = new DeleteOrderUseCase(
      this.ordersRepository,
      this.deleteOrderPresenter
    );

    await deleteOrderUseCase.execute(useCaseRequestModel);
  }
}
