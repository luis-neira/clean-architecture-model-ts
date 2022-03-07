import { Result } from '../../lib/result';
import { OrderMap } from '../../../common/mappers';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IOrdersGateway } from '../interfaces';

export default class GetOrdersUseCase implements IUseCaseInputBoundary {
  private ordersRepository: IOrdersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    ordersRepository: IOrdersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ordersRepository = ordersRepository;
    this.presenter = presenter;
  }

  public async execute(): Promise<void> {
    try {
      const foundOrders = await this.ordersRepository.find();

      const foundOrderDTOs = foundOrders.map((o) => OrderMap.toDTO(o));

      this.presenter.execute(foundOrderDTOs);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
