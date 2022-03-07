import { Result } from '../../lib/result';
import { ValueNotFoundError } from '../../../common/errors';

import {
  IIngramProductsGateway,
  IGetProductByIdRequestModel,
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary
} from '../interfaces';

export default class GetProductByIdUseCase implements IUseCaseInputBoundary {
  private ingramProductsRepository: IIngramProductsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    ingramProductsRepository: IIngramProductsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ingramProductsRepository = ingramProductsRepository;
    this.presenter = presenter;
  }

  public async execute({ id }: IGetProductByIdRequestModel): Promise<void> {
    try {
      const foundProduct = await this.ingramProductsRepository.findOne(id);

      if (foundProduct === null) {
        throw new ValueNotFoundError(`Couldn't find product by id=${id}`);
      }

      const productDTO = foundProduct.getProps();

      this.presenter.execute(productDTO);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
