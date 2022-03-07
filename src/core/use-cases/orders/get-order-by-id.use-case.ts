import { Result } from '../../lib/result';
import { ValueNotFoundError } from '../../../common/errors';
import { OrderMap } from '../../../common/mappers';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IOrdersGateway, IGetOrderByIdRequestModel } from '../interfaces';

export default class GetOrderByIdUseCase implements IUseCaseInputBoundary {
  private ordersRepository: IOrdersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    ordersRepository: IOrdersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ordersRepository = ordersRepository;
    this.presenter = presenter;
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

      const foundOrderDTO = OrderMap.toDTO(foundOrder);

      this.presenter.execute(foundOrderDTO);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
