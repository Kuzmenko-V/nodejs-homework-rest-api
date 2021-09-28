const getContacts = require('./getContacts')
const updateContacts = require('./updateContacts')

const updateContactById = async (id, data) => {
  const contacts = await getContacts()
  const newContact = {
    id,
    ...data
  }
  const idx = contacts.findIndex(item => String(item.id) === String(id))
  if (idx === -1) { return null }
  contacts[idx] = { ...contacts[idx], ...newContact }
  await updateContacts(contacts)
  return contacts[idx]
}

module.exports = updateContactById
