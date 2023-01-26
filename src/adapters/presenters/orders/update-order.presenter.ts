import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class UpdateOrderPresenter
  implements IUseCaseOutputBoundary
{
  private updateOrderResponder: IResponder;

  public constructor(updateOrderResponder: IResponder) {
    this.updateOrderResponder = updateOrderResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.updateOrderResponder.respond(successResponse);
  }
}
