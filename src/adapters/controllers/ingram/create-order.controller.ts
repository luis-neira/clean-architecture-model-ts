import { CreateOrderUseCase } from '../../../core/use-cases/ingram';
import { CreateOrderPresenter } from '../../presenters/ingram';

import {
  IIngramOrdersGateway,
  IItemsGateway,
  ICustomersGateway,
  IPurchaseOrdersGateway,
  IOrderItemsGateway,
  ICreateIngramOrderRequestModel
} from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder, IValidator } from '../interfaces';

export default class CreateOrderController {
  private ingramOrdersRepository: IIngramOrdersGateway;
  private itemsRepository: IItemsGateway;
  private customersRepository: ICustomersGateway;
  private purchaseOrderRepository: IPurchaseOrdersGateway;
  private orderItemsRepository: IOrderItemsGateway;
  private createOrderPresenter: CreateOrderPresenter;
  private validation: IValidator;

  public constructor(
    ingramOrdersRepository: IIngramOrdersGateway,
    itemsRepository: IItemsGateway,
    customersRepository: ICustomersGateway,
    purchaseOrderRepository: IPurchaseOrdersGateway,
    orderItemsRepository: IOrderItemsGateway,
    createdResponder: IResponder,
    validation: IValidator
  ) {
    this.ingramOrdersRepository = ingramOrdersRepository;
    this.itemsRepository = itemsRepository;
    this.customersRepository = customersRepository;
    this.purchaseOrderRepository = purchaseOrderRepository;
    this.orderItemsRepository = orderItemsRepository;
    this.createOrderPresenter = new CreateOrderPresenter(createdResponder);
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestModelCandidate = req.body;

    // const requestValidatedOrError = await this.validation.validate(
    //   requestModelCandidate
    // );

    // if (requestValidatedOrError.isFailure) {
    //   throw requestValidatedOrError;
    // }

    // const useCaseRequestModel: ICreateIngramOrderRequestModel =
    //   requestValidatedOrError.getValue();

    // injectAccountNumber(useCaseRequestModel);
    injectAccountNumber(requestModelCandidate);

    const createOrderUseCase = new CreateOrderUseCase(
      this.ingramOrdersRepository,
      this.itemsRepository,
      this.customersRepository,
      this.purchaseOrderRepository,
      this.orderItemsRepository,
      this.createOrderPresenter
    );

    await createOrderUseCase.execute(requestModelCandidate);
  }
}

function injectAccountNumber(request: ICreateIngramOrderRequestModel): void {
  request.orders.map((order) => {
    return order.lineItems.map((lineItem) => {
      lineItem.account = process.env.INGRAM_ACCOUNT_NUMBER!;
      return lineItem;
    });
  });
}
