import { Result } from '../../lib/result';
import { ValueNotFoundError } from '../../../common/errors';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IIngramProductPricesGateway,
  IGetProductPriceByIdRequestModel
} from '../interfaces';

export default class GetProductPriceByIdUseCase
  implements IUseCaseInputBoundary
{
  private ingramProductPricesRepository: IIngramProductPricesGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    ingramProductPricesRepository: IIngramProductPricesGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ingramProductPricesRepository = ingramProductPricesRepository;
    this.presenter = presenter;
  }

  public async execute({
    id
  }: IGetProductPriceByIdRequestModel): Promise<void> {
    try {
      const foundPrice = await this.ingramProductPricesRepository.findOne(id);

      if (foundPrice === null) {
        throw new ValueNotFoundError(`Couldn't find price by id=${id}`);
      }

      const productsDTO = foundPrice.getProps();

      this.presenter.execute(productsDTO);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
