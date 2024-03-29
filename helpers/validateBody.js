// const  HttpError  = require("../helpers/HttpError");

// const {
//   createContactSchema,
//   updateContactSchema,
// } = require('../schemas/contactsSchemas');

// const validateBody = schema => {
//   const func = (req, res, next) => {
//     const { error } = schema.validate(req.body);

//     if (error && schema == createContactSchema) {
//       throw HttpError(400, error.message);
//     } else if (error && schema == updateContactSchema) {
//       throw HttpError(400, 'Body must have at least one field');
//     }

//     next();
//   };

//   return func;
// };

// module.exports = validateBody;
const HttpError = require("./HttpError.js");


const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;