import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class UpdateImagePresenter implements IUseCaseOutputBoundary {
  private updateImageResponder: IResponder;

  public constructor(updateImageResponder: IResponder) {
    this.updateImageResponder = updateImageResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.updateImageResponder.respond(successResponse);
  }
}
