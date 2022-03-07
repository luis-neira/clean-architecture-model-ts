import { Result } from '../../lib/result';
import { Product } from '../../entities';
import { ProductMap } from '../../../common/mappers';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IProductsGateway, IAddProductRequestModel } from '../interfaces';

export default class AddProductUseCase implements IUseCaseInputBoundary {
  private productsRepository: IProductsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    productsRepository: IProductsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.productsRepository = productsRepository;
    this.presenter = presenter;
  }

  async execute(requestModel: IAddProductRequestModel): Promise<void> {
    const { name, description, images, price, color, meta } = requestModel;

    const product = Product.create(
      {
        name,
        description,
        images,
        price,
        color,
        meta
      },
      null
    );

    try {
      const addedProduct = await this.productsRepository.create(product);

      const addedProductDTO = ProductMap.toDTO(addedProduct);

      this.presenter.execute(addedProductDTO);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
