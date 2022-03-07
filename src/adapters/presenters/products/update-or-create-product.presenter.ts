import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class UpdateOrCreateProductPresenter
  implements IUseCaseOutputBoundary
{
  private updateOrCreateProductResponder: IResponder;

  public constructor(updateOrCreateProductResponder: IResponder) {
    this.updateOrCreateProductResponder = updateOrCreateProductResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.updateOrCreateProductResponder.respond(successResponse);
  }
}
