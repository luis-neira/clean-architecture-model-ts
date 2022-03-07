import { Result } from '../../lib/result';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  ICustomersGateway
} from '../interfaces';

export default class GetCustomersUseCase implements IUseCaseInputBoundary {
  private customersRepository: ICustomersGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    customersRepository: ICustomersGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.customersRepository = customersRepository;
    this.presenter = presenter;
  }

  public async execute(): Promise<void> {
    try {
      const foundCustomers = await this.customersRepository.find();

      this.presenter.execute(foundCustomers);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
