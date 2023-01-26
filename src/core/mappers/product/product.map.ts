import { Product } from '../../entities';
import IEntityMapper from '../i-entity-mapper';
import { IProductDto } from '../../dtos/product';

export default class ProductMapper implements IEntityMapper<Product, IProductDto> {
  public constructor() {}

  public toDTO(product: Product): IProductDto {
    const p = product.toJSON();
    Reflect.deleteProperty(p, 'id');
    Reflect.deleteProperty(p, 'price');

    return {
      productId: product.id,
      ...p,
      price: product.price.toFixed(2)
    };
  }

  public toDomain(raw: { [key:string]: any }): Product {
    if (typeof raw.price === 'string') {
      raw.price = parseFloat(raw.price);
    }
    
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
