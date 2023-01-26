import Joi from 'joi';

export default Joi.object({
  userId: Joi.string().guid({ version: 'uuidv4', separator: true }).required(),
  productIds: Joi.array().items(Joi.string().guid({ version: 'uuidv4', separator: true }).required()).required(),
  isPaid: Joi.boolean().required(),
  meta: Joi.object().pattern(Joi.string(), Joi.any())
});
