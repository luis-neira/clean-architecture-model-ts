import { Result } from '../../lib/result';
import { ProductMap } from '../../../common/mappers';
import { Product } from '../../entities';

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

  public constructor(
    productsRepository: IProductsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.productsRepository = productsRepository;
    this.presenter = presenter;
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

      const updatedProductDTO = ProductMap.toDTO(updatedProduct!);

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

    const addedProductDTO = ProductMap.toDTO(addedProduct);

    this.presenter.execute(addedProductDTO);
  }
}
