import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class UpdateOrCreateUserPresenter
  implements IUseCaseOutputBoundary
{
  private updateOrCreateUserResponder: IResponder;

  public constructor(updateOrCreateUserResponder: IResponder) {
    this.updateOrCreateUserResponder = updateOrCreateUserResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.updateOrCreateUserResponder.respond(successResponse);
  }
}
