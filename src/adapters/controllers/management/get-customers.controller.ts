import { GetCustomersUseCase } from '../../../core/use-cases/management';
import { GetCustomersPresenter } from '../../presenters/management';

import { ICustomersGateway } from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetCustomersController {
  private customersRepository: ICustomersGateway;
  private getCustomersPresenter: GetCustomersPresenter;

  public constructor(
    customersRepository: ICustomersGateway,
    createdResponder: IResponder
  ) {
    this.customersRepository = customersRepository;
    this.getCustomersPresenter = new GetCustomersPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getItemsUseCase = new GetCustomersUseCase(
      this.customersRepository,
      this.getCustomersPresenter
    );

    await getItemsUseCase.execute();
  }
}
