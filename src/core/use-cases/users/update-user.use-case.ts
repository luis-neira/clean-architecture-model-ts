import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors'

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IUsersGateway,
  IUpdateUserRequestModel
} from '../interfaces';

export default class UpdateUserUseCase
  implements IUseCaseInputBoundary
{
  private usersRepository: IUsersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    usersRepository: IUsersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.usersRepository = usersRepository;
    this.presenter = presenter;
  }

  public async execute({
    id,
    userDetails
  }: IUpdateUserRequestModel): Promise<void> {
    try {
      const updatedUser = await this.usersRepository.update(userDetails, {
        id
      });

      if (updatedUser == null) {
        throw new ValueNotFoundError(`userId '${id}' not found`);
      }

      this.presenter.execute(updatedUser.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
