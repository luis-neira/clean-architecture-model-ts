import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetItemsPresenter implements IUseCaseOutputBoundary {
  private getItemsResponder: IResponder;

  public constructor(getItemsResponder: IResponder) {
    this.getItemsResponder = getItemsResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getItemsResponder.respond(successResponse);
  }
}
