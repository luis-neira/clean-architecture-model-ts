import Entity from './interfaces/entity.abstract';

interface IOrderItemProps {
  order_id: string;
  item_number: string;
  upc: string;
  item_status: string;
  qty: number;
  price: number;
}

export default class OrderItem extends Entity<IOrderItemProps> {
  private constructor(props: IOrderItemProps, id: string | null) {
    super(props, id);
  }

  public static create(
    orderItemData: IOrderItemProps,
    id: string | null
  ): OrderItem {
    return new OrderItem(orderItemData, id);
  }

  get order_id(): string {
    return this.props.order_id;
  }
  get item_number(): string {
    return this.props.item_number;
  }
  get upc(): string {
    return this.props.upc;
  }
  get item_status(): string {
    return this.props.item_status;
  }
  get qty(): number {
    return this.props.qty;
  }
  get price(): number {
    return this.props.price;
  }
}
