import { Result } from '../../lib/result';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IIngramProductPricesGateway,
} from '../interfaces';

export default class GetProductPricesUseCase implements IUseCaseInputBoundary {
  private ingramProductPricesRepository: IIngramProductPricesGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    ingramProductPricesRepository: IIngramProductPricesGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ingramProductPricesRepository = ingramProductPricesRepository;
    this.presenter = presenter;
  }

  public async execute(): Promise<void> {
    try {
      const foundPrices = await this.ingramProductPricesRepository.find();

      const pricesDTO = foundPrices.map((p) => p.getProps());

      this.presenter.execute(pricesDTO);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
