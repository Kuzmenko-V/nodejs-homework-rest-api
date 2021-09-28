const getContacts = require('./getContacts')

const getContactById = async (id) => {
  const contacts = await getContacts()
  const idx = contacts.findIndex(item => String(item.id) === String(id))
  if (idx === -1) { return null }
  return contacts[idx]
}

module.exports = getContactById
