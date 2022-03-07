import { Result } from '../../lib/result';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IPurchaseOrdersGateway
} from '../interfaces';

export default class GetOrdersUseCase implements IUseCaseInputBoundary {
  private ordersRepository: IPurchaseOrdersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    ordersRepository: IPurchaseOrdersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ordersRepository = ordersRepository;
    this.presenter = presenter;
  }

  public async execute(): Promise<void> {
    try {
      const foundOrders = await this.ordersRepository.find();

      this.presenter.execute(foundOrders);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
