import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors';
import { Image } from '../../entities';
import { ImageMapper } from '../../mappers/image';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IImageDto } from '../../dtos/image'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IImagesGateway,
  IUpdateOrCreateImageRequestModel
} from '../interfaces';

export default class UpdateImageUseCase implements IUseCaseInputBoundary {
  private imagesRepository: IImagesGateway;
  private presenter: IUseCaseOutputBoundary;
  private dataMapper: IEntityMapper<Image, IImageDto>;

  public constructor(
    imagesRepository: IImagesGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.imagesRepository = imagesRepository;
    this.presenter = presenter;
    this.dataMapper = new ImageMapper();
  }

  public async execute({ title, url, thumbnailUrl, _externalId }: IUpdateOrCreateImageRequestModel): Promise<void> {
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
        throw new ValueNotFoundError(`_eternalId '${image._externalId}' not found`);
      }

      const updatedImageDto = this.dataMapper.toDTO(updatedImage);

      this.presenter.execute(updatedImageDto);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
