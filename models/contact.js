const { Schema, model} = require('mongoose')
const handleMongooseError = require('../helpers/handleMongooseError');
const Joi = require("joi");


const contactSchema = new Schema(
    {
        name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      }
},  {versionKey: false, timestamps: true})

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "co", "uk"] },
      })
      .required(),
    phone: Joi.string()
      .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
      .required(),
  });
  
  const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "co", "uk"] },
    }),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
  }).unknown(true);

  const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });

contactSchema.post('save', handleMongooseError)

const Contact = model('contact', contactSchema)

const schemas = {createContactSchema, updateContactSchema, updateFavoriteSchema}

module.exports = {Contact, schemas};