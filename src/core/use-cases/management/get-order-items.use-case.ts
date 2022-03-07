import { Result } from '../../lib/result';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IOrderItemsGateway
} from '../interfaces';

export default class GetOrderItemsUseCase implements IUseCaseInputBoundary {
  private orderItemsRepository: IOrderItemsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    orderItemsRepository: IOrderItemsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.orderItemsRepository = orderItemsRepository;
    this.presenter = presenter;
  }

  public async execute(): Promise<void> {
    try {
      const foundOrderItems = await this.orderItemsRepository.find();

      this.presenter.execute(foundOrderItems);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
