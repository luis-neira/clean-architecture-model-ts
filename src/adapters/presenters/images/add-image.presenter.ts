import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class AddImagePresenter implements IUseCaseOutputBoundary {
  private addImageResponder: IResponder;

  public constructor(addImageResponder: IResponder) {
    this.addImageResponder = addImageResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.addImageResponder.respond(successResponse);
  }
}
