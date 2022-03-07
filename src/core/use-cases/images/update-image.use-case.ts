import { Result } from '../../lib/result';
import { ValueNotFoundError } from '../../../common/errors';
import { Image } from '../../entities';
import { ImageMap } from '../../../common/mappers';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IImagesGateway,
  IUpdateOrCreateImageRequestModel
} from '../interfaces';

export default class UpdateImageUseCase implements IUseCaseInputBoundary {
  private imagesRepository: IImagesGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    imagesRepository: IImagesGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.imagesRepository = imagesRepository;
    this.presenter = presenter;
  }

  public async execute(
    requestModel: IUpdateOrCreateImageRequestModel
  ): Promise<void> {
    const { title, url, thumbnailUrl, _externalId } = requestModel;

    const image = Image.create(
      {
        title,
        url,
        thumbnailUrl,
        _externalId
      },
      null
    );

    try {
      const updatedImage = await this.imagesRepository.update(image, {
        id: _externalId.toString()
      });

      if (updatedImage === null) {
        const errorMsg = `Couldn't find user by id=${image._externalId}`;
        throw Result.fail(new ValueNotFoundError(errorMsg));
      }

      const updatedImageDTO = ImageMap.toDTO(updatedImage);

      this.presenter.execute(updatedImageDTO);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
