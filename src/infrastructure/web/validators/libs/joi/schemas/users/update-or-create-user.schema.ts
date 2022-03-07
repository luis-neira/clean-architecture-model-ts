import Joi from 'joi';

export default Joi.object({
  id: Joi.string().guid({ version: 'uuidv4', separator: true }).required(),
  userDetails: Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    lastName: Joi.string().alphanum().min(3).max(30),
    gender: Joi.number().min(0).max(2),
    meta: Joi.object().pattern(Joi.any(), Joi.string().min(10).max(100))
  }).required()
});
