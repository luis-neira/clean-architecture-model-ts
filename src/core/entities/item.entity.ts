import Entity from './interfaces/entity.abstract';

export interface IItemProps {
  item_nbr: string;
  upc: string;
  item_desc: string;
}

export default class Item extends Entity<IItemProps> {
  private constructor(props: IItemProps, id: string | null) {
    super(props, id);
  }

  public static create(
    itemData: IItemProps,
    id: string | null
  ): Item {
    return new Item(itemData, id);
  }

  get item_nbr(): string {
    return this.props.item_nbr;
  }
  get upc(): string {
    return this.props.upc;
  }
  get item_desc(): string {
    return this.props.item_desc;
  }
}
