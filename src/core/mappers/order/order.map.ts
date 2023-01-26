import { Order } from '../../entities';
import IEntityMapper from '../i-entity-mapper';
import { IOrderDto } from '../../dtos/order';

export default class OrderMapper implements IEntityMapper<Order, IOrderDto> {
  public constructor() {}

  public toDTO(order: Order): IOrderDto {
    const o = order.toJSON();
    Reflect.deleteProperty(o, 'id');
    return {
      orderId: order.id,
      ...o
    };
  }

  public toDomain(raw: { [key:string]: any }): Order {
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
