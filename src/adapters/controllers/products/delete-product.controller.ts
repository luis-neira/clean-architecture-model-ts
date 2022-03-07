import { IHttpRequestModel } from '../interfaces';

import { DeleteProductUseCase } from '../../../core/use-cases/products';
import { DeleteProductPresenter } from '../../../adapters/presenters/products';

import { IProductsGateway } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class DeleteProductController {
  private productsRepository: IProductsGateway;
  private deleteProductPresenter: DeleteProductPresenter;

  public constructor(
    productsRepository: IProductsGateway,
    noContentResponder: IResponder
  ) {
    this.productsRepository = productsRepository;
    this.deleteProductPresenter = new DeleteProductPresenter(
      noContentResponder
    );
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      id: req.params.id
    };

    const deleteProductUseCase = new DeleteProductUseCase(
      this.productsRepository,
      this.deleteProductPresenter
    );

    await deleteProductUseCase.execute(useCaseRequestModel);
  }
}
