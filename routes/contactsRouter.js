const express =  require ("express")
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require ("../controllers/contactsControllers.js")

const  validateBody  = require("../helpers/validateBody");
const { createContactSchema, updateContactSchema } = require("../schemas/contactsSchemas.js")

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

// contactsRouter.post("/", createContact);
contactsRouter.post('/', validateBody(createContactSchema), createContact);

// contactsRouter.put("/:id", updateContact);

contactsRouter.put("/:id",validateBody(updateContactSchema), updateContact);

module.exports = contactsRouter;
