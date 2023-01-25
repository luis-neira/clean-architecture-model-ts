import { Product } from '../../entities';
import IEntityMapper from '../i-entity-mapper';
import IProdcutDto from '../../dtos/product/product.dto';

export default class ProductMapper implements IEntityMapper<Product, IProdcutDto> {
  public constructor() {}

  public toDTO(product: Product): IProdcutDto {
    const p = product.toJSON();
    Reflect.deleteProperty(p, 'id');
    return {
      productId: product.id,
      ...p
    };
  }

  public toDomain(raw: { [key:string]: any }): Product {
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
