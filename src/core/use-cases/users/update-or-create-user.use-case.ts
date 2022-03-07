import { Result } from '../../lib/result';
import { UserMap } from '../../../common/mappers';
import { User } from '../../entities';
import { ValueNotFoundError } from '../../../common/errors';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IUsersGateway,
  IUserDetails,
  IUpdateOrCreateUserRequestModel
} from '../interfaces';

export default class UpdateOrCreateUserUseCase
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
  }: IUpdateOrCreateUserRequestModel): Promise<void> {
    try {
      const foundUser = await this.usersRepository.findOne(id);

      if (foundUser === null) {
        if (userDetails.name === undefined)
          throw new ValueNotFoundError("'name' is required");
        if (userDetails.lastName === undefined)
          throw new ValueNotFoundError("'lastName' is required");
        if (userDetails.gender === undefined)
          throw new ValueNotFoundError("'gender' is required");
        if (userDetails.meta === undefined)
          throw new ValueNotFoundError("'meta' is required");

        this.addUserUseCase(userDetails, id);
        return;
      }

      const userCandidate = User.create(userDetails, id);

      const updatedUser = await this.usersRepository.update(userCandidate, {
        id
      });

      const updatedUserDTO = UserMap.toDTO(updatedUser!);

      this.presenter.execute(updatedUserDTO);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }

  private async addUserUseCase(
    userDetails: IUserDetails,
    userId?: string
  ): Promise<void> {
    const userIdOrNull = userId ? userId : null;

    const newUser = User.create(userDetails, userIdOrNull);

    const addedUser = await this.usersRepository.create(newUser);

    const addedUserDTO = UserMap.toDTO(addedUser);

    this.presenter.execute(addedUserDTO);
  }
}
