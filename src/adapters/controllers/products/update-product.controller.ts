import { UpdateProductUseCase } from '@core/use-cases/products';
import { UpdateProductPresenter } from '../../presenters/products';

import { IProductsGateway, IUpdateProductRequestModel } from '@core/use-cases/interfaces';
import { IResponder, IValidator, IHttpRequestModel } from '../interfaces';

export default class UpdateProductController {
  private productsRepository: IProductsGateway;
  private UpdateProductPresenter: UpdateProductPresenter;
  private validation: IValidator;

  public constructor(
    productsRepository: IProductsGateway,
    createdResponder: IResponder,
    validation: IValidator
  ) {
    this.productsRepository = productsRepository;
    this.UpdateProductPresenter = new UpdateProductPresenter(
      createdResponder
    );
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IUpdateProductRequestModel>({
      id: req.params.id,
      productDetails: req.body
    });

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const updateProductUseCase = new UpdateProductUseCase(
      this.productsRepository,
      this.UpdateProductPresenter
    );

    await updateProductUseCase.execute(useCaseRequestModel);
  }
}
