import { GetProductPricesUseCase } from '../../../core/use-cases/ingram';
import { GetProductPricesPresenter } from '../../presenters/ingram';

import { IIngramProductPricesGateway } from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetProductPricesController {
  private ingramProductPricesRepository: IIngramProductPricesGateway;
  private getProductPricesPresenter: GetProductPricesPresenter;

  public constructor(
    ingramProductPricesRepository: IIngramProductPricesGateway,
    createdResponder: IResponder
  ) {
    this.ingramProductPricesRepository = ingramProductPricesRepository;
    this.getProductPricesPresenter = new GetProductPricesPresenter(
      createdResponder
    );
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getProductsUseCase = new GetProductPricesUseCase(
      this.ingramProductPricesRepository,
      this.getProductPricesPresenter
    );

    await getProductsUseCase.execute();
  }
}
