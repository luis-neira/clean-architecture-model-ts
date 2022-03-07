import { Result } from '../../lib/result';
import { ValueNotFoundError } from '../../../common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IImagesGateway, IDeleteImageRequestModel } from '../interfaces';

export default class DeleteImageUseCase implements IUseCaseInputBoundary {
  private imagesRepository: IImagesGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    imagesRepository: IImagesGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.imagesRepository = imagesRepository;
    this.presenter = presenter;
  }

  public async execute(requestModel: IDeleteImageRequestModel): Promise<void> {
    const { id } = requestModel;

    try {
      const imageIsDeleted = await this.imagesRepository.delete(id);

      if (imageIsDeleted === null) {
        throw Result.fail(
          new ValueNotFoundError(`Couldn't find user by id=${id}`)
        );
      }

      this.presenter.execute();
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
