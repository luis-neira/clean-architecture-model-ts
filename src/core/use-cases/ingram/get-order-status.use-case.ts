import { Result } from '../../lib/result';
import { ValueNotFoundError } from '../../../common/errors';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IGetIngramOrderStatusRequestModel,
  IIngramOrderStatusGateway
} from '../interfaces';

export default class GetOrderStatusUseCase implements IUseCaseInputBoundary {
  private ingramOrderStatusRepository: IIngramOrderStatusGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    ingramOrderStatusRepository: IIngramOrderStatusGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ingramOrderStatusRepository = ingramOrderStatusRepository;
    this.presenter = presenter;
  }

  public async execute(
    requestDetails: IGetIngramOrderStatusRequestModel
  ): Promise<void> {
    const FIRST_ORDER = '0';
    const requestOrderStatus = {
      ...requestDetails.order_status
    }[FIRST_ORDER].order;

    try {
      const orderStatuses =
        await this.ingramOrderStatusRepository.findByContext(
          requestOrderStatus
        );

      if (orderStatuses === null) {
        throw new ValueNotFoundError(
          `Couldn't find order status. Verify that order_id=${requestOrderStatus.order_id} or ingram_order_id=${requestOrderStatus.ingram_order_id} is correct.`
        );
      }

      const orderStatusesDTO = orderStatuses.map((status) => status.getProps());

      this.presenter.execute(orderStatusesDTO);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
