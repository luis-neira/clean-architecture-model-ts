import { Result } from '../../lib/result';
import { User } from '../../entities';
import { ValueNotFoundError } from '../../../common/errors';
import { UserMapper } from '../../mappers/user';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IUserDto } from '../../dtos/user'

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
  private dataMapper: IEntityMapper<User, IUserDto>;

  public constructor(
    usersRepository: IUsersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.usersRepository = usersRepository;
    this.presenter = presenter;
    this.dataMapper = new UserMapper();
  }

  public async execute({
    id,
    userDetails
  }: IUpdateOrCreateUserRequestModel): Promise<void> {
    try {
      const foundUser = await this.usersRepository.findOne(id);

      if (foundUser === null) {
        if (userDetails.firstName === undefined)
          throw new ValueNotFoundError("'name' is required");
        if (userDetails.lastName === undefined)
          throw new ValueNotFoundError("'lastName' is required");
        if (userDetails.meta === undefined)
          throw new ValueNotFoundError("'meta' is required");

        this.addUserUseCase(userDetails, id);
        return;
      }

      const userCandidate = User.create(userDetails, id);

      const updatedUser = await this.usersRepository.update(userCandidate, {
        id
      });

      const updatedUserDto = this.dataMapper.toDTO(updatedUser!);

      this.presenter.execute(updatedUserDto);
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

    const addedUserDto = this.dataMapper.toDTO(addedUser);

    this.presenter.execute(addedUserDto);
  }
}
