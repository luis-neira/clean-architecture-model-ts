import Entity from './interfaces/entity.abstract';

import { IngramOrderItem, IIngramOrderItemProps } from './index';

interface IIngramOrderProps {
  orderLineItems: IngramOrderItem[];
}

export default class IngramOrder extends Entity<IIngramOrderProps> {
  private constructor(props: IIngramOrderProps, id: string | null) {
    super(props, id);
  }

  public static create(
    orderData: IIngramOrderProps,
    id: string | null
  ): IngramOrder {
    return new IngramOrder(orderData, id);
  }

  get orderLineItems(): IngramOrderItem[] {
    return this.props.orderLineItems;
  }

  getOrder(): IIngramOrderItemProps[] {
    return this.props.orderLineItems.map((i) => {
      return i.getProps();
    });
  }
}
