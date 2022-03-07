import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetCustomersPresenter implements IUseCaseOutputBoundary {
  private getCustomersResponder: IResponder;

  public constructor(getCustomersResponder: IResponder) {
    this.getCustomersResponder = getCustomersResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getCustomersResponder.respond(successResponse);
  }
}
