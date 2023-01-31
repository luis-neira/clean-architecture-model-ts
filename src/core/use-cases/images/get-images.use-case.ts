import { Result } from '../../lib/result';
import { Image } from '../../entities';
import { ImageMapper } from '../../mappers/image';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IImageDto } from '../../dtos/image'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IImagesGateway } from '../interfaces';

export default class GetImagesUseCase implements IUseCaseInputBoundary {
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

  public async execute(): Promise<void> {
    try {
      const foundImages = await this.imagesRepository.findAll();

      if (foundImages === null) {
        throw new Error('Something went wrong!');
      }

      const foundImageDTOs = foundImages.map((i) => this.dataMapper.toDTO(i));

      this.presenter.execute(foundImageDTOs);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
