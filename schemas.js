// La idea de este archivo es poner los schemas que vamos a usar con joi para validar formularios.
const BaseJoi = require("joi");
const sanitizeHTML = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not incluide HTML!",
  },
  rules: {
    escaeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHTML(value, {
          allowedTags: [],
          allowerAttributes: {},
        });
        if (clean !== value) return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.expSchema = Joi.object({
  exp: Joi.object({
    _id: Joi.number().required(),
    donde: Joi.string().required().escaeHTML(),
    /* logo: Joi.string().required(), */
    cuando: Joi.string().required().escaeHTML(),
    haciendoQue: Joi.string().required().escaeHTML(),
  }).required() /* hay que poner required a la validacion, sino no le da bola */,
});
