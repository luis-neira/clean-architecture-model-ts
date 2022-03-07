import Entity from './interfaces/entity.abstract';

export interface IIngramOrderStatusProps {
  order_id: string;
  ingram_order_id: string;
  item: string;
  item_status: string;
  quantity: number;
}

export default class IngramOrderStatus extends Entity<IIngramOrderStatusProps> {
  private constructor(props: IIngramOrderStatusProps, id: string | null) {
    super(props, id);
  }

  public static create(
    orderStatusData: IIngramOrderStatusProps,
    id: string | null
  ): IngramOrderStatus {
    return new IngramOrderStatus(orderStatusData, id);
  }

  get orderId(): string {
    return this.props.order_id;
  }

  get ingramOrderId(): string {
    return this.props.ingram_order_id;
  }

  get item(): string {
    return this.props.item;
  }

  get itemStatus(): string {
    return this.props.item_status;
  }

  get quantity(): number {
    return this.props.quantity;
  }
}
