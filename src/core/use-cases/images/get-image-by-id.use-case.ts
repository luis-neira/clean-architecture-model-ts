import { Result } from '../../lib/result';
import { ValueNotFoundError } from '../../../common/errors';
import { ImageMap } from '../../../common/mappers';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IImagesGateway, IGetImageByIdRequestModel } from '../interfaces';

export default class GetImageByIdUseCase implements IUseCaseInputBoundary {
  private imagesRepository: IImagesGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    imagesRepository: IImagesGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.imagesRepository = imagesRepository;
    this.presenter = presenter;
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

      const foundImageDTO = ImageMap.toDTO(foundImage);

      this.presenter.execute(foundImageDTO);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
