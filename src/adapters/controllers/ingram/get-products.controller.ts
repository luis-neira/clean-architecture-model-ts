import { GetProductsUseCase } from '../../../core/use-cases/ingram';
import { GetProductsPresenter } from '../../presenters/ingram';

import {
  IIngramProductsGateway,
  IGetProductsRequestModel
} from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class GetProductsController {
  private ingramProductsRepository: IIngramProductsGateway;
  private getProductsPresenter: GetProductsPresenter;

  public constructor(
    ingramProductsRepository: IIngramProductsGateway,
    createdResponder: IResponder
  ) {
    this.ingramProductsRepository = ingramProductsRepository;
    this.getProductsPresenter = new GetProductsPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const searchCategory = req.query.category;
    const searchItemFormat = req.query['item-format'];

    const badQueryError = new Error('Bad Query');
    if (typeof searchCategory === 'object') throw badQueryError;
    if (typeof searchItemFormat === 'object') throw badQueryError;

    const getProductsRequestModel: IGetProductsRequestModel = {
      category: searchCategory as any,
      itemFormat: searchItemFormat as any
    };

    const getProductsUseCase = new GetProductsUseCase(
      this.ingramProductsRepository,
      this.getProductsPresenter
    );

    await getProductsUseCase.execute(getProductsRequestModel);
  }
}
