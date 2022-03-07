import { JoiValidator } from '../validator-wrapper';
import { GetOrderStatusSchema, CreateOrderSchema } from '../schemas/ingram';

export const getOrderStatusValidator = new JoiValidator(GetOrderStatusSchema);
export const createOrderValidator = new JoiValidator(CreateOrderSchema);
