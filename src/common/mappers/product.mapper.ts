import { Product } from '../../core/entities';

export default class ProductMap {
  private constructor() {}

  public static toDTO(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      price: product.price,
      color: product.color,
      meta: product.meta
    };
  }

  public static toPersistence(product: any) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      price: product.price,
      color: product.color,
      meta: product.meta
    };
  }

  public static toDomain(raw: any) {
    return Product.create(
      {
        name: raw.name,
        description: raw.description,
        images: raw.images,
        price: raw.price,
        color: raw.color,
        meta: raw.meta
      },
      raw.id
    );
  }
}
