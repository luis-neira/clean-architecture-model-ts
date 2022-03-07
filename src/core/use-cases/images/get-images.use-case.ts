import { Result } from '../../lib/result';
import { ImageMap } from '../../../common/mappers';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IImagesGateway } from '../interfaces';

export default class GetImagesUseCase implements IUseCaseInputBoundary {
  private imagesRepository: IImagesGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    imagesRepository: IImagesGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.imagesRepository = imagesRepository;
    this.presenter = presenter;
  }

  public async execute(): Promise<void> {
    try {
      const foundImages = await this.imagesRepository.find();

      if (foundImages === null) {
        throw new Error('Something went wrong!');
      }

      const foundImageDTOs = foundImages.map((i) => ImageMap.toDTO(i));

      this.presenter.execute(foundImageDTOs);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
