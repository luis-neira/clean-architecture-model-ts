import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class DeleteUserPresenter implements IUseCaseOutputBoundary {
  private deleteUserResponder: IResponder;

  public constructor(deleteUserResponder: IResponder) {
    this.deleteUserResponder = deleteUserResponder;
  }

  public execute(): void {
    this.deleteUserResponder.respond();
  }
}
