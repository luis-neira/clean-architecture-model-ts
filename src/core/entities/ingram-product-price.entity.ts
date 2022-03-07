import Entity from './interfaces/entity.abstract';

export interface IIngramProductPriceProps {
  item_num: string;
  upc: string;
  scan_gtin?: string;
  item_description: string;
  retail_price: number;
  your_price: number;
}

export default class IngramProductPrice extends Entity<IIngramProductPriceProps> {
  private constructor(props: IIngramProductPriceProps, id: string | null) {
    super(props, id);
  }

  public static create(
    productData: IIngramProductPriceProps,
    id: string | null
  ): IngramProductPrice {
    return new IngramProductPrice(productData, id);
  }

  get itemNum(): string {
    return this.props.item_num;
  }

  get upc(): string {
    return this.props.upc;
  }

  get scanGtin(): string | undefined {
    return this.props.scan_gtin;
  }

  get itemDesc(): string {
    return this.props.item_description;
  }

  get retailPrice(): number {
    return this.props.retail_price;
  }

  get yourPrice(): number {
    return this.props.your_price;
  }
}
