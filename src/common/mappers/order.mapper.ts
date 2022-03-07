import { Order } from '../../core/entities';

export default class OrderMap {
  private constructor() {}

  public static toDTO(order: Order) {
    return {
      id: order.id,
      userId: order.userId,
      productIds: order.productIds,
      date: order.date,
      isPayed: order.isPayed,
      meta: order.meta
    };
  }

  public static toPersistence(order: any) {
    return {
      id: order.id,
      userId: order.userId,
      productIds: order.productIds,
      date: order.date,
      isPayed: order.isPayed,
      meta: order.meta
    };
  }

  public static toDomain(raw: any) {
    return Order.create(
      {
        userId: raw.userId,
        productIds: raw.productIds,
        date: raw.date,
        isPayed: raw.isPayed,
        meta: raw.meta
      },
      raw.id
    );
  }
}
