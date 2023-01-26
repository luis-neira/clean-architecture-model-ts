import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IUsersGateway, IDeleteUserRequestModel } from '../interfaces';

export default class DeleteUserUseCase implements IUseCaseInputBoundary {
  public usersRepository: IUsersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    usersRepository: IUsersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.usersRepository = usersRepository;
    this.presenter = presenter;
  }

  public async execute({ id }: IDeleteUserRequestModel): Promise<void> {
    try {
      const userIsDeleted = await this.usersRepository.delete(id);

      if (userIsDeleted === null) {
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
