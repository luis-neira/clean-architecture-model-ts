import Joi from 'joi';

export default Joi.object({
  id: Joi.string().guid({ version: 'uuidv4', separator: true }).required()
});
