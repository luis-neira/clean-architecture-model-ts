import Joi from 'joi';

export default Joi.object({
  order_status: Joi.array()
    .items(
      Joi.object({
        order: Joi.object({
          order_id: Joi.string().required(),
          ingram_order_id: Joi.string().required()
        }).required()
      }).required()
    ).required()
});
