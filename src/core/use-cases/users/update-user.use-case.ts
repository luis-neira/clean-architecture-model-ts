import { Result } from '../../lib/result';
import { User } from '../../entities';
import { ValueNotFoundError } from '@common/errors'
import { UserMapper } from '../../mappers/user';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IUserDto } from '../../dtos/user'

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
  }: IUpdateUserRequestModel): Promise<void> {
    try {
      const foundUser = await this.usersRepository.findOne(id);

      if (foundUser == null) {
        throw new ValueNotFoundError(`userId '${id}' not found`);
      }

      const modifiedUserDetails = Object.assign(foundUser.toJSON(), userDetails)

      const modifiedUser = User.create(modifiedUserDetails, id);

      const updatedUser = await this.usersRepository.update(modifiedUser, {
        id
      });

      const updatedUserDto = this.dataMapper.toDTO(updatedUser!);

      this.presenter.execute(updatedUserDto);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
