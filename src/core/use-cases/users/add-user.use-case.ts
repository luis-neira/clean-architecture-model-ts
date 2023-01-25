import { Result } from '../../lib/result';
import { User } from '../../entities';
import { CreateUserMapper } from '../../mappers/user';
import IEntityMapper from '../../mappers/i-mapper'
import ICreateUserDto from '../../dtos/user/create-user.dto'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IUsersGateway, IAddUserRequestModel } from '../interfaces';

export default class AddUserUseCase implements IUseCaseInputBoundary {
  private usersRepository: IUsersGateway;
  private presenter: IUseCaseOutputBoundary;
  private dataMapper: IEntityMapper<User, ICreateUserDto>;

  public constructor(
    usersRepository: IUsersGateway,
    presenter: IUseCaseOutputBoundary,
  ) {
    this.usersRepository = usersRepository;
    this.presenter = presenter;
    this.dataMapper = new CreateUserMapper();
  }

  public async execute(requestDetails: IAddUserRequestModel): Promise<void> {
    const user = User.create(requestDetails, null);

    try {
      const addedUser = await this.usersRepository.create(user);

      const addedUserDto = this.dataMapper.toDTO(addedUser);

      this.presenter.execute(addedUserDto);
    } catch (err: any) {
      throw Result.fail(err);
    }
  }
}
