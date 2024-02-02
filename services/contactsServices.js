const fs = require("fs/promises");
const path = require("path");

// import fs from "fs/promises";
// import path from "path";

const contactsPath = path.join("./db/contacts.json");

const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

async function listContacts() {
  // console.log(__dirname)
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return await JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error.message);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactFound = contacts.find((contact) => contact.id === contactId);
    return contactFound || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error.message);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactFound = contacts.find((contact) => contact.id === contactId);

    if (!contactFound) {
      return null;
    }
    const contactIndexFound = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    contacts.splice(contactIndexFound, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contactFound;
  } catch (error) {
    console.error("Error removing contact:", error.message);
    return null;
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const user = {
      id: randomId(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(user);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return user;
  } catch (error) {
    console.error("Error adding contact:", error.message);
    return null;
  }
}

async function updateContact(contactId, data) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);

    if (index === -1) {
      // console.log("Not found", error.message);
      return null;
    }
    const updatedContact = { ...contacts[index], ...data };
    contacts[index] = updatedContact;
    // contacts[index] = {id, ...contacts[index], ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
    // return contacts[index];
  } catch (error) {
    console.error("Error updating contact:", error.message);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
