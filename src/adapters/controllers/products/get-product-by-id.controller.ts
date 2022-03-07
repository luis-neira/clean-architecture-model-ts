import { IHttpRequestModel } from '../interfaces';

import { GetProductByIdUseCase } from '../../../core/use-cases/products';
import { GetProductByIdPresenter } from '../../../adapters/presenters/products';

import { IProductsGateway } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class GetProductByIdController {
  private productsRepository: IProductsGateway;
  private getProductByIdPresenter: GetProductByIdPresenter;

  public constructor(
    productsRepository: IProductsGateway,
    createdResponder: IResponder
  ) {
    this.productsRepository = productsRepository;
    this.getProductByIdPresenter = new GetProductByIdPresenter(
      createdResponder
    );
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      id: req.params.id
    };

    const getProductByIdUseCase = new GetProductByIdUseCase(
      this.productsRepository,
      this.getProductByIdPresenter
    );

    await getProductByIdUseCase.execute(useCaseRequestModel);
  }
}
