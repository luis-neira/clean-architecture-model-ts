import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class UpdateOrCreateOrderPresenter
  implements IUseCaseOutputBoundary
{
  private updateOrCreateOrderResponder: IResponder;

  public constructor(updateOrCreateOrderResponder: IResponder) {
    this.updateOrCreateOrderResponder = updateOrCreateOrderResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.updateOrCreateOrderResponder.respond(successResponse);
  }
}
