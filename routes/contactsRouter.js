const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require("../controllers/contactsControllers.js");

const validateBody = require("../helpers/validateBody");
const { schemas } = require("../models/contact.js");
const isValidId = require("../helpers/isValidId");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

// contactsRouter.post("/", createContact);
contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  createContact
);

// contactsRouter.put("/:id", updateContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = contactsRouter;
