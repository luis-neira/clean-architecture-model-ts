import { Result } from '../../lib/result';
import { User } from '../../entities';
import { UserMap } from '../../../common/mappers';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IUsersGateway, IAddUserRequestModel } from '../interfaces';

export default class AddUserUseCase implements IUseCaseInputBoundary {
  private usersRepository: IUsersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    usersRepository: IUsersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.usersRepository = usersRepository;
    this.presenter = presenter;
  }

  public async execute(requestDetails: IAddUserRequestModel): Promise<void> {
    const user = User.create(requestDetails, null);

    try {
      const addedUser = await this.usersRepository.create(user);

      const addedUserDTO = UserMap.toDTO(addedUser);

      this.presenter.execute(addedUserDTO);
    } catch (err: any) {
      throw Result.fail(err);
    }
  }
}
