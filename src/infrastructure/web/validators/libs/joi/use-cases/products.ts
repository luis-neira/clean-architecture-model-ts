import { JoiValidator } from '../validator-wrapper';
import {
  AddProductSchema
} from '../schemas/product';

export const addProductValidator = new JoiValidator(AddProductSchema);
