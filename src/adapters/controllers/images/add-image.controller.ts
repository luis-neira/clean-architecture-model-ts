import { AddImageUseCase } from '@core/use-cases/images';
import { AddImagePresenter } from '../../presenters/images';

import { IImagesGateway } from '@core/use-cases/interfaces';
import { IResponder, IHttpRequestModel } from '../interfaces';

export default class AddImageController {
  private imagesRepository: IImagesGateway;
  private addImagePresenter: AddImagePresenter;

  public constructor(
    imagesRepository: IImagesGateway,
    createdResponder: IResponder
  ) {
    this.imagesRepository = imagesRepository;
    this.addImagePresenter = new AddImagePresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = req.body;

    const addImageUseCase = new AddImageUseCase(
      this.imagesRepository,
      this.addImagePresenter
    );

    await addImageUseCase.execute(useCaseRequestModel);
  }
}
