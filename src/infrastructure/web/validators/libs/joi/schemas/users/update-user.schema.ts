import Joi from 'joi';

export default Joi.object({
  id: Joi.string().guid({ version: 'uuidv4', separator: true }).required(),
  userDetails: Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    meta: Joi.object().pattern(Joi.any(), Joi.string().max(100))
  }).required()
});
