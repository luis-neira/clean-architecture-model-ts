import { GetOrderByIdUseCase } from '@core/use-cases/orders';
import { GetOrderByIdPresenter } from '@adapters/presenters/orders';

import { IOrdersGateway, IGetOrderByIdRequestModel } from '@core/use-cases/interfaces';
import { IResponder, IValidator, IHttpRequestModel } from '../interfaces';

export default class GetOrderByIdController {
  private ordersRepository: IOrdersGateway;
  private getOrderByIdPresenter: GetOrderByIdPresenter;
  private validation: IValidator;

  public constructor(
    ordersRepository: IOrdersGateway,
    okResponder: IResponder,
    validation: IValidator
  ) {
    this.ordersRepository = ordersRepository;
    this.getOrderByIdPresenter = new GetOrderByIdPresenter(okResponder);
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IGetOrderByIdRequestModel>({
      id: req.params.id
    });

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const getOrderByIdUseCase = new GetOrderByIdUseCase(
      this.ordersRepository,
      this.getOrderByIdPresenter
    );

    await getOrderByIdUseCase.execute(useCaseRequestModel);
  }
}
