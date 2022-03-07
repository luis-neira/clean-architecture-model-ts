import { IHttpRequestModel } from '../interfaces';

import { UpdateImageUseCase } from '../../../core/use-cases/images';
import { UpdateImagePresenter } from '../../../adapters/presenters/images';

import { IImagesGateway } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class UpdateImageController {
  private imagesRepository: IImagesGateway;
  private updateImagePresenter: UpdateImagePresenter;

  public constructor(
    imagesRepository: IImagesGateway,
    createdResponder: IResponder
  ) {
    this.imagesRepository = imagesRepository;
    this.updateImagePresenter = new UpdateImagePresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      ...req.body,
      _externalId: req.params.id
    };

    const updateImageUseCase = new UpdateImageUseCase(
      this.imagesRepository,
      this.updateImagePresenter
    );

    await updateImageUseCase.execute(useCaseRequestModel);
  }
}
