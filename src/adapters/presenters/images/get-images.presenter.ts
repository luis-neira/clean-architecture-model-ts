import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetImagesPresenter implements IUseCaseOutputBoundary {
  private getImagesResponder: IResponder;

  public constructor(getImagesResponder: IResponder) {
    this.getImagesResponder = getImagesResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getImagesResponder.respond(successResponse);
  }
}
