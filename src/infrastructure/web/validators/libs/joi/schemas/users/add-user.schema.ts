import Joi from 'joi';

export default Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  gender: Joi.number().min(0).max(2).required(),
  meta: Joi.object().pattern(Joi.any(), Joi.string().min(10).max(100))
});


