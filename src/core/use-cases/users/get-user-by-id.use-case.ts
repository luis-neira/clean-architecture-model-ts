import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors';
import { UserMapper } from '../../mappers/user';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IUserDto } from '../../dtos/user'
import { User } from '../../entities';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IUsersGateway, IGetUserByIdRequestModel } from '../interfaces';

export default class GetUserByIdUseCase implements IUseCaseInputBoundary {
  private usersRepository: IUsersGateway;
  private presenter: IUseCaseOutputBoundary;
  private dataMapper: IEntityMapper<User, IUserDto>

  public constructor(
    usersRepository: IUsersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.usersRepository = usersRepository;
    this.presenter = presenter;
    this.dataMapper = new UserMapper();
  }

  public async execute({ id }: IGetUserByIdRequestModel): Promise<void> {
    try {
      const foundUser = await this.usersRepository.findOne(id);

      if (foundUser === null) {
        throw Result.fail(
          new ValueNotFoundError(`Couldn't find user by id=${id}`)
        );
      }

      const foundUserDto = this.dataMapper.toDTO(foundUser);

      this.presenter.execute(foundUserDto);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
