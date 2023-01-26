import { JoiValidator } from '../validator-wrapper';
import {
  AddProductSchema,
  GetProductByIdSchema,
  DeleteProductByIdSchema,
  UpdateProductSchema
} from '../schemas/product';

export const addProductValidator = new JoiValidator(AddProductSchema);
export const getProductByIdValidator = new JoiValidator(GetProductByIdSchema);
export const deleteProductByIdValidator = new JoiValidator(DeleteProductByIdSchema);
export const updateProductValidator = new JoiValidator(
  UpdateProductSchema
);
