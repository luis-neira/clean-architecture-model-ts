import { GetCustomersUseCase } from '../../../core/use-cases/management';
import { CreateOrderPresenter } from '../../presenters/ingram';

import { ICustomersGateway } from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetCustomersController {
  private customersRepository: ICustomersGateway;
  private createOrderPresenter: CreateOrderPresenter;

  public constructor(
    customersRepository: ICustomersGateway,
    createdResponder: IResponder
  ) {
    this.customersRepository = customersRepository;
    this.createOrderPresenter = new CreateOrderPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getItemsUseCase = new GetCustomersUseCase(
      this.customersRepository,
      this.createOrderPresenter
    );

    await getItemsUseCase.execute();
  }
}
