import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class DeleteOrderPresenter implements IUseCaseOutputBoundary {
  private deleteOrderResponder: IResponder;

  public constructor(deleteOrderResponder: IResponder) {
    this.deleteOrderResponder = deleteOrderResponder;
  }

  public execute(): void {
    this.deleteOrderResponder.respond();
  }
}
