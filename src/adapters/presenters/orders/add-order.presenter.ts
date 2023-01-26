import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class AddOrderPresenter implements IUseCaseOutputBoundary {
  private addOrderResponder: IResponder;

  public constructor(addOrderResponder: IResponder) {
    this.addOrderResponder = addOrderResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.addOrderResponder.respond(successResponse);
  }
}
