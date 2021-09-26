const getContacts = require('./getContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const removeById = require('./removeById')
const updateContacts = require('./updateContacts')
const updateContactById = require('./updateContactById')

module.exports = {
  getContacts,
  getContactById,
  updateContacts,
  addContact,
  removeById,
  updateContactById
}
