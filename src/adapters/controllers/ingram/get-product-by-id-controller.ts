import { GetProductByIdUseCase } from '../../../core/use-cases/ingram';
import { GetProductByIdPresenter } from '../../presenters/ingram';

import { IIngramProductsGateway } from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetProductByIdController {
  private ingramProductsRepository: IIngramProductsGateway;
  private getProductByIdPresenter: GetProductByIdPresenter;

  public constructor(
    ingramProductsRepository: IIngramProductsGateway,
    createdResponder: IResponder
  ) {
    this.ingramProductsRepository = ingramProductsRepository;
    this.getProductByIdPresenter = new GetProductByIdPresenter(
      createdResponder
    );
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getProductByIdRequestModel = {
      id: req.params.id
    };

    const getProductsUseCase = new GetProductByIdUseCase(
      this.ingramProductsRepository,
      this.getProductByIdPresenter
    );

    await getProductsUseCase.execute(getProductByIdRequestModel);
  }
}
