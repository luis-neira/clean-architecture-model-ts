import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class UpdateUserPresenter
  implements IUseCaseOutputBoundary
{
  private updateUserResponder: IResponder;

  public constructor(updateUserResponder: IResponder) {
    this.updateUserResponder = updateUserResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.updateUserResponder.respond(successResponse);
  }
}
