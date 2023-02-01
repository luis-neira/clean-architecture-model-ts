import { Result } from '../../lib/result';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IUsersGateway, IAddUserRequestModel } from '../interfaces';

export default class AddUserUseCase implements IUseCaseInputBoundary {
  private usersRepository: IUsersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    usersRepository: IUsersGateway,
    presenter: IUseCaseOutputBoundary,
  ) {
    this.usersRepository = usersRepository;
    this.presenter = presenter;
  }

  public async execute(requestDetails: IAddUserRequestModel): Promise<void> {
    try {
      const user = await this.usersRepository.create(requestDetails);

      const addedUser = await this.usersRepository.save(user);

      this.presenter.execute(addedUser.toJSON());
    } catch (err: any) {
      throw Result.fail(err);
    }
  }
}
