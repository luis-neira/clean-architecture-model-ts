import Entity from './interfaces/entity.abstract';

interface IPurchaseOrderProps {
  order_id: string;
  ingram_order_id: string;
  order_status: string;
  account: string;
  customer_id: string;
}

export default class PurchaseOrder extends Entity<IPurchaseOrderProps> {
  private constructor(props: IPurchaseOrderProps, id: string | null) {
    super(props, id);
  }

  public static create(
    purchaseOrderData: IPurchaseOrderProps,
    id: string | null
  ): PurchaseOrder {
    return new PurchaseOrder(purchaseOrderData, id);
  }

  get order_id(): string {
    return this.props.order_id;
  }
  get ingram_order_id(): string {
    return this.props.ingram_order_id;
  }
  get account(): string {
    return this.props.account;
  }
  get order_status(): string {
    return this.props.order_status;
  }
  get customer_id(): string {
    return this.props.customer_id;
  }
}
