import { JoiValidator } from '../validator-wrapper';
import {
  AddOrderSchema,
  GetOrderByIdSchema,
  DeleteOrderByIdSchema,
  UpdateOrderSchema
} from '../schemas/order';

export const addOrderValidator = new JoiValidator(AddOrderSchema);
export const getOrderByIdValidator = new JoiValidator(GetOrderByIdSchema);
export const deleteOrderByIdValidator = new JoiValidator(DeleteOrderByIdSchema);
export const updateOrderValidator = new JoiValidator(
  UpdateOrderSchema
);
