import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IUsersGateway, IGetUserByIdRequestModel } from '../interfaces';

export default class GetUserByIdUseCase implements IUseCaseInputBoundary {
  private usersRepository: IUsersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    usersRepository: IUsersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.usersRepository = usersRepository;
    this.presenter = presenter;
  }

  public async execute({ id }: IGetUserByIdRequestModel): Promise<void> {
    try {
      const foundUser = await this.usersRepository.findOne(id);

      if (foundUser === null) {
        throw Result.fail(
          new ValueNotFoundError(`Couldn't find user by id=${id}`)
        );
      }


      this.presenter.execute(foundUser.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
