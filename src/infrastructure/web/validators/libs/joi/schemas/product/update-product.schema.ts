import Joi from 'joi';

export default Joi.object({
  id: Joi.string().guid({ version: 'uuidv4', separator: true }).required(),
  productDetails: Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(30),
    images: Joi.array().items(Joi.string().min(3).max(30)),
    price: Joi.number().precision(2),
    color: Joi.string().alphanum().min(3).max(30),
    meta: Joi.object().pattern(Joi.string(), Joi.any())
  }).required()
});
