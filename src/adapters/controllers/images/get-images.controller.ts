import { GetImagesUseCase } from '@core/use-cases/images';
import { GetImagesPresenter } from '../../presenters/images';

import { IImagesGateway } from '@core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetImagesController {
  private imagesRepository: IImagesGateway;
  private getImagesPresenter: GetImagesPresenter;

  public constructor(
    imagesRepository: IImagesGateway,
    okResponder: IResponder
  ) {
    this.imagesRepository = imagesRepository;
    this.getImagesPresenter = new GetImagesPresenter(okResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getImagesUseCase = new GetImagesUseCase(
      this.imagesRepository,
      this.getImagesPresenter
    );

    await getImagesUseCase.execute();
  }
}
