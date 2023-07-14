import { Result } from '@core/lib/result';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IUsersGateway } from '../interfaces';

export default class GetUsersUseCase implements IUseCaseInputBoundary {
  private usersRepository: IUsersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    usersRepository: IUsersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.usersRepository = usersRepository;
    this.presenter = presenter;
  }

  public async execute(): Promise<void> {
    try {
      const foundUsers = await this.usersRepository.findAll();

      const foundUserDTOs = foundUsers.map((u) => u.toJSON());

      this.presenter.execute(foundUserDTOs);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
