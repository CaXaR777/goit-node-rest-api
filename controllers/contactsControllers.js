const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Contact } = require("../models/contact.js");

const getAllContacts = async (req, res) => {
  const listContacts = await Contact.find();
  res.status(200).json(listContacts);
};

const getOneContact = async (req, res) => {
  const getContactById = await Contact.findById(req.params.id);

  if (!getContactById) {
    throw HttpError(404);
  }

  res.json(getContactById);
};

const deleteContact = async (req, res) => {
  const removeContact = await Contact.findByIdAndDelete(req.params.id);

  if (!removeContact) {
    throw HttpError(404);
  }
  res.json(removeContact);
};

const createContact = async (req, res) => {
  const addContact = await Contact.create(req.body);

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

  const updateContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!updateContact) {
    throw HttpError(404);
  }
  res.json(updateContact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "Body must have favorite field");
  }
  const updateFavorites = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updateFavorites) {
    throw HttpError(404);
  }
  res.json(updateFavorites);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
