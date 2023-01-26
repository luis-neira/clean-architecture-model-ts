import { DeleteProductUseCase } from '@core/use-cases/products';
import { DeleteProductPresenter } from '../../presenters/products';

import { IProductsGateway, IDeleteProductRequestModel } from '@core/use-cases/interfaces';
import { IResponder, IValidator, IHttpRequestModel } from '../interfaces';

export default class DeleteProductController {
  private productsRepository: IProductsGateway;
  private deleteProductPresenter: DeleteProductPresenter;
  private validation: IValidator;

  public constructor(
    productsRepository: IProductsGateway,
    noContentResponder: IResponder,
    validation: IValidator
  ) {
    this.productsRepository = productsRepository;
    this.deleteProductPresenter = new DeleteProductPresenter(
      noContentResponder
    );
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IDeleteProductRequestModel>({
      id: req.params.id
    });

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const deleteProductUseCase = new DeleteProductUseCase(
      this.productsRepository,
      this.deleteProductPresenter
    );

    await deleteProductUseCase.execute(useCaseRequestModel);
  }
}
