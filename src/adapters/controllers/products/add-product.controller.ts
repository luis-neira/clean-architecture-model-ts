import { AddProductUseCase } from '@core/use-cases/products';
import { AddProductPresenter } from '../../presenters/products';

import { IProductsGateway, IAddProductRequestModel } from '@core/use-cases/interfaces';
import { IResponder, IValidator, IHttpRequestModel } from '../interfaces';

export default class AddProductController {
  private productsRepository: IProductsGateway;
  private addProductPresenter: AddProductPresenter;
  private validation: IValidator;

  public constructor(
    productsRepository: IProductsGateway,
    createdResponder: IResponder,
    validation: IValidator
  ) {
    this.productsRepository = productsRepository;
    this.addProductPresenter = new AddProductPresenter(createdResponder);
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IAddProductRequestModel>(
      req.body
    );

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const addProductUseCase = new AddProductUseCase(
      this.productsRepository,
      this.addProductPresenter
    );

    await addProductUseCase.execute(useCaseRequestModel);
  }
}
