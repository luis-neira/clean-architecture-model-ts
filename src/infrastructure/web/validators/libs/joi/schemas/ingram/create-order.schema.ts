import Joi from 'joi';

export default Joi.object({
  orders: Joi.array()
    .items(
      Joi.object({
        lineItems: Joi.array()
          .items(
            Joi.object({
              order_id: Joi.string().trim().required(),
              item_number: Joi.string().trim().required(),
              price: Joi.number().positive().required(),
              qty: Joi.number().integer().positive().required(),
              ship_to_name: Joi.string().max(70).trim().required(),
              ship_address1: Joi.string().max(70).trim().required(),
              ship_address2: Joi.string().allow('').max(70).trim().required(),
              ship_city: Joi.string().min(3).max(70).trim().required(),
              ship_state: Joi.string().length(2).trim().required(),
              ship_country: Joi.string().length(2).trim().required(),
              ship_zip: Joi.string().length(5).trim().required(),
              carrier_code: Joi.string().length(3).trim().required(),
              service_class: Joi.string().length(2).trim().required(),
              email: Joi.string().email().allow('').optional(),
              ship_phone: Joi.string().min(10).max(11).trim().required()
            }).required()
          ).required()
      }).required()
    ).required()
});
