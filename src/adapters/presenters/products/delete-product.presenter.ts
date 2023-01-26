import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class DeleteProductPresenter implements IUseCaseOutputBoundary {
  private deleteProductResponder: IResponder;

  public constructor(deleteProductResponder: IResponder) {
    this.deleteProductResponder = deleteProductResponder;
  }

  public execute(): void {
    this.deleteProductResponder.respond();
  }
}
