import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IOrdersGateway, IDeleteOrderRequestModel } from '../interfaces';

export default class DeleteOrderUseCase implements IUseCaseInputBoundary {
  private ordersRepository: IOrdersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    ordersRepository: IOrdersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ordersRepository = ordersRepository;
    this.presenter = presenter;
  }

  public async execute(requestModel: IDeleteOrderRequestModel): Promise<void> {
    const { id } = requestModel;

    try {
      const orderIsDeleted = await this.ordersRepository.delete(id);

      if (orderIsDeleted === null) {
        throw Result.fail(
          new ValueNotFoundError(`Couldn't find order by id=${id}`)
        );
      }

      this.presenter.execute();
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
