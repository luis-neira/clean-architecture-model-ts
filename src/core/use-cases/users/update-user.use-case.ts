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
      const foundUser = await this.usersRepository.findOne(id);

      if (foundUser == null) {
        throw new ValueNotFoundError(`userId '${id}' not found`);
      }

      const updatedUser = this.usersRepository.update(foundUser, userDetails);

      await this.usersRepository.save(updatedUser);

      this.presenter.execute(updatedUser.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
