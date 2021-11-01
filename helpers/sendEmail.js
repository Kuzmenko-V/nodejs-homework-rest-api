const sgEmail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_KEY, SENDGRID_EMAIL } = process.env

sgEmail.setApiKey(SENDGRID_KEY)

const sendEmail = async (data) => {
  const email = { ...data, from: SENDGRID_EMAIL }
  try {
    await sgEmail.send(email)
    return true
  } catch (error) {
    throw error
  }
}

module.exports = sendEmail
