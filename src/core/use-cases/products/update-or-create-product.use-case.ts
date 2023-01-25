import { Result } from '../../lib/result';
import { Product } from '../../entities';
import { ProductMapper } from '../../mappers/product';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IProductDto } from '../../dtos/product'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IProductsGateway,
  IProductDetails,
  IUpdateOrCreateProductRequestModel
} from '../interfaces';

export default class UpdateOrCreateProductUseCase
  implements IUseCaseInputBoundary
{
  private productsRepository: IProductsGateway;
  private presenter: IUseCaseOutputBoundary;
  private dataMapper: IEntityMapper<Product, IProductDto>;

  public constructor(
    productsRepository: IProductsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.productsRepository = productsRepository;
    this.presenter = presenter;
    this.dataMapper = new ProductMapper();
  }

  public async execute(
    requestModel: IUpdateOrCreateProductRequestModel
  ): Promise<void> {
    const { id, productDetails } = requestModel;

    try {
      const foundProduct = await this.productsRepository.findOne(id);

      if (foundProduct === null) {
        this.addProductUseCase(productDetails, id);
        return;
      }

      const productCandidate = Product.create(productDetails, id);

      const updatedProduct = await this.productsRepository.update(
        productCandidate,
        { id }
      );

      const updatedProductDTO = this.dataMapper.toDTO(updatedProduct!);

      this.presenter.execute(updatedProductDTO);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }

  private async addProductUseCase(
    productDetails: IProductDetails,
    productId?: string
  ) {
    const productIdOrNull = productId ? productId : null;

    const product = Product.create(
      {
        name: productDetails.name,
        description: productDetails.description,
        images: productDetails.images,
        price: productDetails.price,
        color: productDetails.color,
        meta: productDetails.meta
      },
      productIdOrNull
    );

    const addedProduct = await this.productsRepository.create(product);

    const addedProductDTO = this.dataMapper.toDTO(addedProduct);

    this.presenter.execute(addedProductDTO);
  }
}
