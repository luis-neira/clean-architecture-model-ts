import { Result } from '../../lib/result';
import {
  IngramOrder,
  IngramOrderItem,
  IIngramOrderStatusProps,
  Item,
  Customer,
  PurchaseOrder,
  OrderItem,
  IngramOrderStatus
} from '../../entities';

import {
  IUseCaseInputBoundary,
  IUseCaseOutputBoundary,
  IIngramOrdersGateway,
  ICreateIngramOrderRequestModel,
  ILineItem,
  IItemsGateway,
  ICustomersGateway,
  IPurchaseOrdersGateway,
  IOrderItemsGateway
} from '../interfaces';

export default class CreateOrderUseCase implements IUseCaseInputBoundary {
  private ingramOrdersRepository: IIngramOrdersGateway;
  private itemsRepository: IItemsGateway;
  private customersRepository: ICustomersGateway;
  private purchaseOrderRepository: IPurchaseOrdersGateway;
  private orderItemsRepository: IOrderItemsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    ingramOrdersRepository: IIngramOrdersGateway,
    itemsRepository: IItemsGateway,
    customersRepository: ICustomersGateway,
    purchaseOrderRepository: IPurchaseOrdersGateway,
    orderItemsRepository: IOrderItemsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.ingramOrdersRepository = ingramOrdersRepository;
    this.itemsRepository = itemsRepository;
    this.customersRepository = customersRepository;
    this.purchaseOrderRepository = purchaseOrderRepository;
    this.orderItemsRepository = orderItemsRepository;
    this.presenter = presenter;
  }

  public async execute({
    orders
  }: ICreateIngramOrderRequestModel): Promise<void> {
    try {
      // submit orders to ingram
      const ingramOrders = createIngramOrders(orders);

      const orderStatuses = await this.ingramOrdersRepository.createMany(
        ingramOrders
      );

      // save items to db
      const items = createItems(orders);

      const isItemsSaved = await this.itemsRepository.putMany(items);

      if (!isItemsSaved) {
        throw new Error('Order failed to update items db');
      }

      // save customers to db
      const orderCustomers = createCustomers(orders);

      const isCustomersSaved = await this.customersRepository.putMany(
        orderCustomers
      );

      if (!isCustomersSaved) {
        throw new Error('Order failed to update customers db');
      }

      // create response DTO for the presenter
      const orderStatusesDTO = createOrderStatusesDTO(orderStatuses);

      // save orders to db
      const purchaseOrders = createUniquePurchaseOrders(
        orderStatusesDTO,
        orders
      );

      const isPurchaseOrdersSaved =
        await this.purchaseOrderRepository.createMany(purchaseOrders);

      if (!isPurchaseOrdersSaved) {
        throw new Error('Order failed to update orders db');
      }

      // save order line items to db
      const orderItems = createOrderItems(orderStatusesDTO, orders);

      const isOrderItemsSaved = await this.orderItemsRepository.createMany(
        orderItems
      );

      if (!isOrderItemsSaved) {
        throw new Error('Order failed to update orders-items db');
      }

      // execute presenter
      this.presenter.execute(orderStatusesDTO);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}

type Orders = [
  {
    lineItems: ILineItem[];
  }
];

function createIngramOrders(orders: Orders): IngramOrder[] {
  const orderRequest = orders.map((order) => {
    const orderLineItems = order.lineItems.map((lineItem) => {
      return IngramOrderItem.create(lineItem, null);
    });

    return IngramOrder.create({ orderLineItems: orderLineItems }, null);
  });

  return orderRequest;
}

function createItems(orders: Orders): Item[] {
  const extractedOrder = orders.reduce(
    function (accum, order, i) {
      for (const lineItem of order.lineItems) {
        const item = Item.create(
          {
            item_nbr: lineItem.item_number,
            upc: lineItem.upc,
            item_desc: lineItem.item_desc
          },
          null
        );
        accum.orderItems.push(item);
      }

      return accum;
    },
    { orderItems: [] as Item[] }
  );

  return extractedOrder.orderItems;
}

function createCustomers(orders: Orders): Customer[] {
  const extractedOrder = orders.reduce(
    function (accum, order, i) {
      for (const lineItem of order.lineItems) {
        const customer = Customer.create(
          {
            customer_id: lineItem.customer_id,
            ship_to_name: lineItem.ship_to_name,
            ship_address1: lineItem.ship_address1,
            ship_address2: lineItem.ship_address2,
            ship_city: lineItem.ship_city,
            ship_state: lineItem.ship_state,
            ship_country: lineItem.ship_country,
            ship_zip: lineItem.ship_zip,
            carrier_code: lineItem.carrier_code,
            service_class: lineItem.service_class,
            email: lineItem.email,
            ship_phone: lineItem.ship_phone
          },
          null
        );
        accum.orderCustomers.push(customer);
      }

      return accum;
    },
    { orderCustomers: [] as Customer[] }
  );

  return extractedOrder.orderCustomers;
}

function createUniquePurchaseOrders(
  orderStatuses: { orderStatus: IIngramOrderStatusProps[] }[],
  orders: Orders
): PurchaseOrder[] {
  const purchaseOrders = orderStatuses.reduce((accum, order, i) => {
    const orderLineItems = orders[i].lineItems;

    order.orderStatus.map((status, idx) => {
      accum.push(
        PurchaseOrder.create(
          {
            order_id: status.order_id,
            ingram_order_id: status.ingram_order_id,
            order_status: status.item_status,
            account: process.env.INGRAM_ACCOUNT_NUMBER!,
            customer_id: orderLineItems[idx].customer_id
          },
          null
        )
      );
    });

    return accum;
  }, [] as PurchaseOrder[]);

  const uniquePurchaseOrders = purchaseOrders.filter((po, i, self) => {
    return i === self.findIndex((_po) => _po.order_id === po.order_id);
  });

  return uniquePurchaseOrders;
}

function createOrderItems(
  orderStatuses: { orderStatus: IIngramOrderStatusProps[] }[],
  orders: Orders
): OrderItem[] {
  const orderItems = orderStatuses.reduce((accum, order, i) => {
    const orderLineItems = orders[i].lineItems;

    order.orderStatus.map((status, idx) => {
      accum.push(
        OrderItem.create(
          {
            order_id: status.order_id,
            item_number: orderLineItems[idx].item_number,
            upc: orderLineItems[idx].upc,
            item_status: status.item_status,
            qty: orderLineItems[idx].qty,
            price: orderLineItems[idx].price
          },
          null
        )
      );
    });

    return accum;
  }, [] as OrderItem[]);

  return orderItems;
}

function createOrderStatusesDTO(
  orderStatuses: {
    orderStatus: IngramOrderStatus[];
  }[]
) {
  return orderStatuses.map((order) => {
    return {
      orderStatus: order.orderStatus.map((status) => status.getProps())
    };
  });
}
