const Joi = require("joi");

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

// const compiledCreateContactSchema = Joi.compile(createContactSchema);
// const compiledUpdateContactSchema = Joi.compile(updateContactSchema);

module.exports = { createContactSchema, updateContactSchema };

// module.exports = { createContactSchema, updateContactSchema, compiledCreateContactSchema, compiledUpdateContactSchema };