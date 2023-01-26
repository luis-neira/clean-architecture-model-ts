import Entity from './interfaces/entity.abstract';

interface IOrderProps {
  userId: string;
  productIds: string[];
  date: Date;
  isPaid: boolean;
  meta: Record<string, any>;
}

export default class Order extends Entity<IOrderProps> {
  private constructor(props: IOrderProps, id: string | null) {
    super(props, id);
  }

  public static create(orderData: IOrderProps, id: string | null): Order {
    const {
      userId = '00000000-0000-0000-0000-000000000000',
      productIds = [],
      date = new Date(),
      isPaid = false,
      meta = {}
    } = orderData;

    return new Order({ userId, productIds, date, isPaid, meta }, id);
  }

  get userId(): string {
    return this.props.userId;
  }

  get productIds(): string[] {
    return this.props.productIds;
  }

  get date(): Date {
    return this.props.date;
  }

  get isPaid(): boolean {
    return this.props.isPaid;
  }

  get meta(): Record<string, any> {
    return this.props.meta;
  }
}
