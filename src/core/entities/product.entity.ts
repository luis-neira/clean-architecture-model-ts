import Entity from './interfaces/entity.abstract';

interface IProductProps {
  name: string;
  description: string;
  images: string[];
  price: number;
  color: string;
  meta: Record<string, any>;
}

export default class Product extends Entity<IProductProps> {
  private constructor(props: IProductProps, id: string | null) {
    super(props, id);
  }

  public static create(productData: IProductProps, id: string | null): Product {
    const {
      name,
      description,
      images = [],
      price = 0.00,
      color,
      meta = {}
    }: IProductProps = productData;

    return new Product({ name, description, images, price, color, meta }, id);
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get images(): string[] {
    return this.props.images;
  }

  get price(): number {
    return this.props.price;
  }

  get color(): string {
    return this.props.color;
  }

  get meta(): Record<string, any> {
    return this.props.meta;
  }
}
