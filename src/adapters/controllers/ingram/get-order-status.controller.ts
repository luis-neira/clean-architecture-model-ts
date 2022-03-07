import { GetOrderStatusUseCase } from '../../../core/use-cases/ingram';
import { GetOrderStatusPresenter } from '../../presenters/ingram';

import {
  IIngramOrderStatusGateway,
  IGetIngramOrderStatusRequestModel
} from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder, IValidator } from '../interfaces';

export default class GetOrderStatusController {
  private ingramOrderStatusRepository: IIngramOrderStatusGateway;
  private getOrderStatusPresenter: GetOrderStatusPresenter;
  private validation: IValidator;

  public constructor(
    ingramOrderStatusRepository: IIngramOrderStatusGateway,
    createdResponder: IResponder,
    validation: IValidator
  ) {
    this.ingramOrderStatusRepository = ingramOrderStatusRepository;
    this.getOrderStatusPresenter = new GetOrderStatusPresenter(
      createdResponder
    );
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestModelCandidate = req.body;

    const requestValidatedOrError = await this.validation.validate(
      requestModelCandidate
    );

    if (requestValidatedOrError.isFailure) {
      throw requestValidatedOrError;
    }

    const useCaseRequestModel: IGetIngramOrderStatusRequestModel =
      requestValidatedOrError.getValue();

    injectAccountNumber(useCaseRequestModel);

    const getOrderStatusUseCase = new GetOrderStatusUseCase(
      this.ingramOrderStatusRepository,
      this.getOrderStatusPresenter
    );

    await getOrderStatusUseCase.execute(useCaseRequestModel);
  }
}

function injectAccountNumber(request: IGetIngramOrderStatusRequestModel): void {
  const FIRST_ORDER_STATUS = 0;
  const targetOrder = request.order_status[FIRST_ORDER_STATUS].order;
  targetOrder.account = process.env.INGRAM_ACCOUNT_NUMBER!;
}
