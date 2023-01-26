import { DeleteImageUseCase } from '@core/use-cases/images';
import { DeleteImagePresenter } from '../../presenters/images';

import { IImagesGateway } from '@core/use-cases/interfaces';
import { IResponder, IHttpRequestModel } from '../interfaces';

export default class DeleteImageController {
  private imagesRepository: IImagesGateway;
  private deleteImagePresenter: DeleteImagePresenter;

  public constructor(
    imagesRepository: IImagesGateway,
    noContentResponder: IResponder
  ) {
    this.imagesRepository = imagesRepository;
    this.deleteImagePresenter = new DeleteImagePresenter(noContentResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      id: req.params.id
    };

    const deleteImageUseCase = new DeleteImageUseCase(
      this.imagesRepository,
      this.deleteImagePresenter
    );

    await deleteImageUseCase.execute(useCaseRequestModel);
  }
}
