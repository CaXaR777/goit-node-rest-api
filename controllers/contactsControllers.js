const contactsService = require("../services/contactsServices.js");
const HttpError = require("../helpers/HttpError");

const getAllContacts = async (req, res) => {
  try {
    const listContacts = await contactsService.listContacts();
    res.status(200).json(listContacts);
  } catch (e) {
    console.log(e);
  }
};

const getOneContact = async (req, res) => {
  const getContactById = await contactsService.getContactById(req.params.id);

  if (!getContactById) {
    throw HttpError(404);
  }

  res.status(200).json(getContactById);
};

const deleteContact = async (req, res) => {
  const removeContact = await contactsService.removeContact(req.params.id);

  if (!removeContact) {
    throw HttpError(404);
  }
  res.status(200).json(removeContact);
};

const createContact = async (req, res) => {
  const addContact = await contactsService.addContact(req.body);

  if (!addContact) {
    throw HttpError(404);
  }

  res.status(201).json(addContact);
};

const updateContact = async (req, res) => {
  if (Object.keys(req.body).length < 1) {
    throw HttpError(400, "Body must have at least one field");
  }

  const updateContact = await contactsService.updateContact(
    req.params.id,
    req.body
  );
  res.status(200).json(updateContact);
  if (!updateContact) {
    throw HttpError(404);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};