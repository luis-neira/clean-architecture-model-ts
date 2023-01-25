import { Result } from '../../lib/result';
import { User } from '../../entities';
import { ValidationError } from '../../../common/errors';
import { UserMapper } from '../../mappers/user';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IUserDto } from '../../dtos/user'
import AddUserUseCase from './add-user.use-case';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IUsersGateway,
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
          throw new ValidationError("'firstName' is required");
        if (userDetails.lastName === undefined)
          throw new ValidationError("'lastName' is required");
        if (userDetails.meta === undefined)
          throw new ValidationError("'meta' is required");

        const addUserUseCase = new AddUserUseCase(
          this.usersRepository,
          this.presenter
        );
        addUserUseCase.execute(userDetails);
        return;
      }

      if (userDetails.firstName === undefined)
        throw new ValidationError("'firstName' is required");
      if (userDetails.lastName === undefined)
        throw new ValidationError("'lastName' is required");
      if (userDetails.meta === undefined)
        throw new ValidationError("'meta' is required");

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
}
