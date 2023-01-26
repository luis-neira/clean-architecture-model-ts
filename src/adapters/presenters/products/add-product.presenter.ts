import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class AddProductPresenter implements IUseCaseOutputBoundary {
  private addProductResponder: IResponder;

  public constructor(addProductResponder: IResponder) {
    this.addProductResponder = addProductResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.addProductResponder.respond(successResponse);
  }
}
