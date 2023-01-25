import { IHttpRequestModel } from '../interfaces';

import { UpdateProductUseCase } from '../../../core/use-cases/products';
import { UpdateProductPresenter } from '../../presenters/products';

import { IProductsGateway } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class UpdateProductController {
  private productsRepository: IProductsGateway;
  private UpdateProductPresenter: UpdateProductPresenter;

  public constructor(
    productsRepository: IProductsGateway,
    createdResponder: IResponder
  ) {
    this.productsRepository = productsRepository;
    this.UpdateProductPresenter = new UpdateProductPresenter(
      createdResponder
    );
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      id: req.params.id,
      productDetails: req.body
    };

    const updateProductUseCase = new UpdateProductUseCase(
      this.productsRepository,
      this.UpdateProductPresenter
    );

    await updateProductUseCase.execute(useCaseRequestModel);
  }
}
