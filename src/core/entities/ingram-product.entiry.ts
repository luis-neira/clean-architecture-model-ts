import Entity from './interfaces/entity.abstract';

export interface IIngramProductProps {
  item_nbr: string;
  upc: string;
  gtin?: string;
  scan_gtin?: string;
  item_desc: string;
  branch02: 'CHICAGO';
  branch02_qty: number;
  branch03: 'PORTLAND';
  branch03_qty: number;
  branch04: 'MEMPHIS';
  branch04_qty: number;
  branch05: 'BALTIMORE';
  branch05_qty: number;
  branch06: 'ORANGE';
  branch06_qty: number;
  branch07: 'TOLEDO';
  branch07_qty: number;
  qty_all_available: number;
}

export default class IngramProduct extends Entity<IIngramProductProps> {
  private constructor(props: IIngramProductProps, id: string | null) {
    super(props, id);
  }

  public static create(
    productData: IIngramProductProps,
    id: string | null
  ): IngramProduct {
    return new IngramProduct(productData, id);
  }

  get itemNum(): string {
    return this.props.item_nbr;
  }

  get upc(): string {
    return this.props.upc;
  }

  get gtin(): string | undefined {
    return this.props.gtin;
  }

  get scanGtin(): string | undefined {
    return this.props.scan_gtin;
  }

  get itemDesc(): string {
    return this.props.item_desc;
  }

  get branch02(): 'CHICAGO' {
    return this.props.branch02;
  }

  get branch02Qty(): number {
    return this.props.branch02_qty;
  }

  get branch03(): 'PORTLAND' {
    return this.props.branch03;
  }

  get branch03Qty(): number {
    return this.props.branch02_qty;
  }

  get branch04(): 'MEMPHIS' {
    return this.props.branch04;
  }

  get branch04Qty(): number {
    return this.props.branch02_qty;
  }

  get branch05(): 'BALTIMORE' {
    return this.props.branch05;
  }

  get branch05Qty(): number {
    return this.props.branch02_qty;
  }

  get branch06(): 'ORANGE' {
    return this.props.branch06;
  }

  get branch06Qty(): number {
    return this.props.branch02_qty;
  }

  get branch07(): 'TOLEDO' {
    return this.props.branch07;
  }

  get branch07Qty(): number {
    return this.props.branch07_qty;
  }

  get qtyAllAvailable(): number {
    return this.props.qty_all_available;
  }
}
