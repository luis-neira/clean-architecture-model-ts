import { IHttpRequestModel } from '../interfaces';

import { GetImageByIdUseCase } from '../../../core/use-cases/images';
import { GetImageByIdPresenter } from '../../../adapters/presenters/images';

import { IImagesGateway } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class GetImageByIdController {
  private imagesRepository: IImagesGateway;
  private getImageByIdPresenter: GetImageByIdPresenter;

  public constructor(
    imagesRepository: IImagesGateway,
    okResponder: IResponder
  ) {
    this.imagesRepository = imagesRepository;
    this.getImageByIdPresenter = new GetImageByIdPresenter(okResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = {
      id: req.params.id
    };

    const getImageByIdUseCase = new GetImageByIdUseCase(
      this.imagesRepository,
      this.getImageByIdPresenter
    );

    await getImageByIdUseCase.execute(useCaseRequestModel);
  }
}
