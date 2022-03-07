import { GetProductPriceByIdUseCase } from '../../../core/use-cases/ingram';
import { GetProductPriceByIdPresenter } from '../../presenters/ingram';

import {
  IIngramProductPricesGateway,
  IGetProductPriceByIdRequestModel
} from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetProductPriceByIdController {
  private ingramProductPricesRepository: IIngramProductPricesGateway;
  private getProductPriceByIdPresenter: GetProductPriceByIdPresenter;

  public constructor(
    ingramProductPricesRepository: IIngramProductPricesGateway,
    createdResponder: IResponder
  ) {
    this.ingramProductPricesRepository = ingramProductPricesRepository;
    this.getProductPriceByIdPresenter = new GetProductPriceByIdPresenter(
      createdResponder
    );
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getProductPriceByIdRequestModel: IGetProductPriceByIdRequestModel = {
      id: req.params.id
    };

    const getProductPriceByIdUseCase = new GetProductPriceByIdUseCase(
      this.ingramProductPricesRepository,
      this.getProductPriceByIdPresenter
    );

    await getProductPriceByIdUseCase.execute(getProductPriceByIdRequestModel);
  }
}
