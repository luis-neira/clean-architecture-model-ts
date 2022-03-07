import { Result } from '../../lib/result';
import { Image } from '../../entities';
import { ImageMap } from '../../../common/mappers';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IImagesGateway, IAddImageRequestModel } from '../interfaces';

export default class AddImageUseCase implements IUseCaseInputBoundary {
  private imagesRepository: IImagesGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    imagesRepository: IImagesGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.imagesRepository = imagesRepository;
    this.presenter = presenter;
  }

  public async execute(requestModel: IAddImageRequestModel): Promise<void> {
    const { title, url, thumbnailUrl } = requestModel;

    const image = Image.create(
      {
        title,
        url,
        thumbnailUrl
      },
      null
    );

    try {
      const addedImage = await this.imagesRepository.create(image);

      const addedImageDTO = ImageMap.toDTO(addedImage);

      this.presenter.execute(addedImageDTO);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
