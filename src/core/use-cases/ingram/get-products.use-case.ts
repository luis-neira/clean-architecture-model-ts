import { Result } from '../../lib/result';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IIngramProductsGateway,
  IGetProductsRequestModel
} from '../interfaces';

export default class GetProductsUseCase implements IUseCaseInputBoundary {
  private ingramProductsRepository: IIngramProductsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    ingramProductsRepository: IIngramProductsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ingramProductsRepository = ingramProductsRepository;
    this.presenter = presenter;
  }

  public async execute({
    category,
    itemFormat
  }: IGetProductsRequestModel): Promise<void> {
    try {
      if (category) {
        const foundProducts =
          await this.ingramProductsRepository.findByCategory(category);

        const productsDTO = foundProducts.map((p) => p.getProps());

        this.presenter.execute(productsDTO);
        return;
      }

      if (itemFormat) {
        const foundProducts =
          await this.ingramProductsRepository.findByItemFormat(itemFormat);

        const productsDTO = foundProducts.map((p) => p.getProps());

        this.presenter.execute(productsDTO);
        return;
      }

      const foundProducts = await this.ingramProductsRepository.find();

      const productsDTO = foundProducts.map((p) => p.getProps());

      this.presenter.execute(productsDTO);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
