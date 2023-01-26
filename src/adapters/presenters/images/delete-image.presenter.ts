import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class DeleteImagePresenter implements IUseCaseOutputBoundary {
  private deleteImageResponder: IResponder;

  public constructor(deleteImageResponder: IResponder) {
    this.deleteImageResponder = deleteImageResponder;
  }

  public execute(): void {
    this.deleteImageResponder.respond();
  }
}
