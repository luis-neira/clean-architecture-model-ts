import Joi from 'joi';

export default Joi.object({
  id: Joi.string().guid({ version: 'uuidv4', separator: true }).required(),
  userDetails: Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30),
    lastName: Joi.string().alphanum().min(3).max(30),
    meta: Joi.object().pattern(Joi.string(), Joi.any())
  }).required()
});
