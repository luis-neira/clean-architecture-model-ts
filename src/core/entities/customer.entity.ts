import Entity from './interfaces/entity.abstract';

export interface ICustomerProps {
  customer_id: string;
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

export default class Customer extends Entity<ICustomerProps> {
  private constructor(props: ICustomerProps, id: string | null) {
    super(props, id);
  }

  public static create(
    customerData: ICustomerProps,
    id: string | null
  ): Customer {
    return new Customer(customerData, id);
  }

  get customer_id(): string {
    return this.props.customer_id;
  }
  get ship_to_name(): string {
    return this.props.ship_to_name;
  }
  get ship_address1(): string {
    return this.props.ship_address1;
  }
  get ship_address2(): string {
    return this.props.ship_address2;
  }
  get ship_city(): string {
    return this.props.ship_city;
  }
  get ship_state(): string {
    return this.props.ship_state;
  }
  get ship_country(): string {
    return this.props.ship_country;
  }
  get ship_zip(): string {
    return this.props.ship_zip;
  }
  get carrier_code(): string {
    return this.props.carrier_code;
  }
  get service_class(): string {
    return this.props.service_class;
  }
  get email(): string {
    return this.props.email;
  }
  get ship_phone(): string {
    return this.props.ship_phone;
  }
}
