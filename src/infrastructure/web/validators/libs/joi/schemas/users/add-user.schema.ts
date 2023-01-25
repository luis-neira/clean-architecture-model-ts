import Joi from 'joi';

export default Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  meta: Joi.object().pattern(Joi.string(), Joi.string().max(100))
});
