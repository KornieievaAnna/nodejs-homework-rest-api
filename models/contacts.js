const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((i) => i.id === id);
  return result || null;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function updateContact(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((i) => i.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await updateContacts(contacts);
  return contacts[index];
}

async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((i) => i.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
