import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors';
import { Order } from '../../entities';
import { OrderMapper } from '../../mappers/order';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IOrderDto } from '../../dtos/order'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IOrdersGateway, IGetOrderByIdRequestModel } from '../interfaces';

export default class GetOrderByIdUseCase implements IUseCaseInputBoundary {
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

  public async execute(requestModel: IGetOrderByIdRequestModel): Promise<void> {
    const { id } = requestModel;

    try {
      const foundOrder = await this.ordersRepository.findOne(id);

      if (foundOrder === null) {
        throw Result.fail(
          new ValueNotFoundError(`Couldn't find order by id=${id}`)
        );
      }

      const foundOrderDto= this.dataMapper.toDTO(foundOrder);

      this.presenter.execute(foundOrderDto);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
