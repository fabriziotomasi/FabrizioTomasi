// La idea de este archivo es poner los schemas que vamos a usar con joi para validar formularios.
const Joi = require("joi");

module.exports.expSchema = Joi.object({
    exp: Joi.object({
        _id: Joi.number().required(),
        donde: Joi.string().required(),
        logo: Joi.string().required(),
        cuando: Joi.string().required(),
        haciendoQue: Joi.string().required()
    }).required()
});