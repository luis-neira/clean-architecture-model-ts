import { Result } from '../../lib/result';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IItemsGateway
} from '../interfaces';

export default class GetItemsUseCase implements IUseCaseInputBoundary {
  private itemsRepository: IItemsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    itemsRepository: IItemsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.itemsRepository = itemsRepository;
    this.presenter = presenter;
  }

  public async execute(): Promise<void> {
    try {
      const foundItems = await this.itemsRepository.find();

      this.presenter.execute(foundItems);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
