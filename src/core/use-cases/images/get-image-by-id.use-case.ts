import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors';
import { Image } from '../../entities';
import { ImageMapper } from '../../mappers/image';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IImageDto } from '../../dtos/image'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IImagesGateway, IGetImageByIdRequestModel } from '../interfaces';

export default class GetImageByIdUseCase implements IUseCaseInputBoundary {
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

  public async execute(requestModel: IGetImageByIdRequestModel): Promise<void> {
    const { id } = requestModel;

    try {
      const foundImage = await this.imagesRepository.findOne(id);

      if (foundImage === null) {
        throw Result.fail(
          new ValueNotFoundError(`Couldn't find image by id=${id}`)
        );
      }

      const foundImageDto = this.dataMapper.toDTO(foundImage);

      this.presenter.execute(foundImageDto);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
