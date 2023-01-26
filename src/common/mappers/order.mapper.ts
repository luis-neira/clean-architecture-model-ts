import { Order } from '../../core/entities';

export default class OrderMap {
  private constructor() {}

  public static toDTO(order: Order) {
    return {
      id: order.id,
      userId: order.userId,
      productIds: order.productIds,
      date: order.date,
      isPaid: order.isPaid,
      meta: order.meta
    };
  }

  public static toPersistence(order: any) {
    return {
      id: order.id,
      userId: order.userId,
      productIds: order.productIds,
      date: order.date,
      isPaid: order.isPaid,
      meta: order.meta
    };
  }

  public static toDomain(raw: any) {
    return Order.create(
      {
        userId: raw.userId,
        productIds: raw.productIds,
        date: raw.date,
        isPaid: raw.isPaid,
        meta: raw.meta
      },
      raw.id
    );
  }
}
