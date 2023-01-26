import { GetProductByIdUseCase } from '@core/use-cases/products';
import { GetProductByIdPresenter } from '../../presenters/products';

import { IProductsGateway, IGetProductByIdRequestModel } from '@core/use-cases/interfaces';
import { IResponder, IValidator, IHttpRequestModel } from '../interfaces';

export default class GetProductByIdController {
  private productsRepository: IProductsGateway;
  private getProductByIdPresenter: GetProductByIdPresenter;
  private validation: IValidator;

  public constructor(
    productsRepository: IProductsGateway,
    createdResponder: IResponder,
    validation: IValidator
  ) {
    this.productsRepository = productsRepository;
    this.getProductByIdPresenter = new GetProductByIdPresenter(
      createdResponder
    );
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IGetProductByIdRequestModel>({
      id: req.params.id
    });

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const getProductByIdUseCase = new GetProductByIdUseCase(
      this.productsRepository,
      this.getProductByIdPresenter
    );

    await getProductByIdUseCase.execute(useCaseRequestModel);
  }
}
