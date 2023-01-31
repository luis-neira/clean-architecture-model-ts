import { Result } from '../../lib/result';
import { UserMapper } from '../../mappers/user';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IUserDto } from '../../dtos/user'
import { User } from '../../entities';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IUsersGateway } from '../interfaces';

export default class GetUsersUseCase implements IUseCaseInputBoundary {
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

  public async execute(): Promise<void> {
    try {
      const foundUsers = await this.usersRepository.findAll();

      const foundUserDTOs = foundUsers.map((u) => this.dataMapper.toDTO(u));

      this.presenter.execute(foundUserDTOs);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
