import { Result } from '../../lib/result';
import { Order } from '../../entities';
import { OrderMapper } from '../../mappers/order';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IOrderDto } from '../../dtos/order'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IOrdersGateway } from '../interfaces';

export default class GetOrdersUseCase implements IUseCaseInputBoundary {
  private ordersRepository: IOrdersGateway;
  private presenter: IUseCaseOutputBoundary;
  private dataMapper: IEntityMapper<Order, IOrderDto>;

  public constructor(
    ordersRepository: IOrdersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ordersRepository = ordersRepository;
    this.presenter = presenter;
    this.dataMapper = new OrderMapper();
  }

  public async execute(): Promise<void> {
    try {
      const foundOrders = await this.ordersRepository.findAll();

      const foundOrderDTOs = foundOrders.map((o) => this.dataMapper.toDTO(o));

      this.presenter.execute(foundOrderDTOs);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
