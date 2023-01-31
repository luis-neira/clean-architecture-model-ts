import { Result } from '../../lib/result';
import { Image } from '../../entities';
import { ImageMapper } from '../../mappers/image';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IImageDto } from '../../dtos/image'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IImagesGateway, IAddImageRequestModel } from '../interfaces';

export default class AddImageUseCase implements IUseCaseInputBoundary {
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
      const addedImage = await this.imagesRepository.save(image);

      const addedImageDto = this.dataMapper.toDTO(addedImage);

      this.presenter.execute(addedImageDto);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
