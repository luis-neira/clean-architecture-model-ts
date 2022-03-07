import Entity from './interfaces/entity.abstract';

export interface IIngramOrderItemProps {
  account: string;
  order_id: string;
  item_number: string;
  price: number;
  qty: number;
  ship_to_name: string;
  ship_address1: string;
  ship_address2: string;
  ship_city: string;
  ship_state: string;
  ship_country: string;
  ship_zip: string;
  carrier_code: string;
  service_class: string;
  email: string;
  ship_phone: string;
}

export default class IngramOrderItem extends Entity<IIngramOrderItemProps> {
  private constructor(props: IIngramOrderItemProps, id: string | null) {
    super(props, id);
  }

  public static create(
    orderLineItemData: IIngramOrderItemProps,
    id: string | null
  ): IngramOrderItem {
    return new IngramOrderItem(orderLineItemData, id);
  }

  get orderId(): string {
    return this.props.order_id;
  }

  get itemNumber(): string {
    return this.props.item_number;
  }

  get price(): number {
    return this.props.price;
  }

  get qty(): number {
    return this.props.qty;
  }

  get shipToName(): string {
    return this.props.ship_to_name;
  }

  get shipAddress1(): string {
    return this.props.ship_address1;
  }

  get shipAddress2(): string {
    return this.props.ship_address2;
  }

  get shipCity(): string {
    return this.props.ship_city;
  }

  get shipState(): string {
    return this.props.ship_state;
  }

  get shipCountry(): string {
    return this.props.ship_country;
  }

  get shipZip(): string {
    return this.props.ship_zip;
  }

  get carrierCode(): string {
    return this.props.carrier_code;
  }

  get serviceClass(): string {
    return this.props.service_class;
  }

  get email(): string {
    return this.props.email;
  }

  get shipPhone(): string {
    return this.props.ship_phone;
  }
}
