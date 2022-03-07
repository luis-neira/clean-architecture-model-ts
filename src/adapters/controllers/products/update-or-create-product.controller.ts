import { IHttpRequestModel } from '../interfaces';

import { UpdateOrCreateProductUseCase } from '../../../core/use-cases/products';
import { UpdateOrCreateProductPresenter } from '../../presenters/products';

import { IProductsGateway } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class UpdateOrCreateProductController {
  private productsRepository: IProductsGateway;
  private updateOrCreateProductPresenter: UpdateOrCreateProductPresenter;

  public constructor(
    productsRepository: IProductsGateway,
    createdResponder: IResponder
  ) {
    this.productsRepository = productsRepository;
    this.updateOrCreateProductPresenter = new UpdateOrCreateProductPresenter(
      createdResponder
    );
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      id: req.params.id,
      productDetails: req.body
    };

    const updateProductUseCase = new UpdateOrCreateProductUseCase(
      this.productsRepository,
      this.updateOrCreateProductPresenter
    );

    await updateProductUseCase.execute(useCaseRequestModel);
  }
}
