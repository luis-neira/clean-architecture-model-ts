import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetImageByIdPresenter implements IUseCaseOutputBoundary {
  private getImageByIdResponder: IResponder;

  public constructor(getImageByIdResponder: IResponder) {
    this.getImageByIdResponder = getImageByIdResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getImageByIdResponder.respond(successResponse);
  }
}
