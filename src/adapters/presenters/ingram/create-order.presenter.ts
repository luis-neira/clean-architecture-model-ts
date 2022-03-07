import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class CreateOrderPresenter
  implements IUseCaseOutputBoundary
{
  private createOrderPresenter: IResponder;

  public constructor(createOrderPresenter: IResponder) {
    this.createOrderPresenter = createOrderPresenter;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.createOrderPresenter.respond(successResponse);
  }
}
