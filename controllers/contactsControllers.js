const contactsService = require("../services/contactsServices.js");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

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
  //   try {
  //     const getContactById = await contactsService.getContactById(req.params.id);
  //     res.status(200).json(getContactById);
  //   } catch (e) {
  //     throw HttpError(404);
  //   }
};

const deleteContact = async (req, res) => {
  const removeContact = await contactsService.removeContact(req.params.id);

  if (!removeContact) {
    throw HttpError(404);
  }
  res.status(200).json(removeContact);
  //   try {const removeContact = await contactsService.removeContact(req.params.id);
  //     res.status(200).json(removeContact);
  //   } catch (e) {
  //     throw HttpError(404);
  //   }
};

const createContact = async (req, res) => {
  const addContact = await contactsService.addContact(req.body);

  if (!addContact) {
    throw HttpError(404);
  }

  res.status(201).json(addContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  } 

  const updateContact = await contactsService.updateContact(id, req.body);
  
  if (!updateContact) {
    throw HttpError(404);
  }
  res.status(200).json(updateContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
