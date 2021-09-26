const shortid = require('shortid')
const updateContacts = require('./updateContacts')
const getContacts = require('./getContacts')

const addContact = async (data) => {
  const contacts = await getContacts()
  const newContact = {
    id: shortid.generate(),
    ...data
  }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
