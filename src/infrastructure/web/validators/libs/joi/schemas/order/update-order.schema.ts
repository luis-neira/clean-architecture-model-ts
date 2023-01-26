import Joi from 'joi';

export default Joi.object({
  id: Joi.string().guid({ version: 'uuidv4', separator: true }).required(),
  orderDetails: Joi.object({
    userId: Joi.string().guid({ version: 'uuidv4', separator: true }),
    productIds: Joi.array().items(Joi.string().guid({ version: 'uuidv4', separator: true })),
    isPaid: Joi.boolean(),
    meta: Joi.object().pattern(Joi.string(), Joi.any())
  }).required()
});
