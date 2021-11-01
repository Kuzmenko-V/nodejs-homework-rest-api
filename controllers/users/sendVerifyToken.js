const { User } = require('../../models')
const { Conflict, BadRequest } = require('http-errors')
const { sendEmail } = require('../../helpers')

const sendVerifyToken = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('Пропушено обязательное поле Email')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new Conflict(`Пользователь ${email} не зарегестрирован`)
  }
  if (user.verify) {
    throw new BadRequest('Верификация была пройдена')
  }
  const verifyToken = user.verifyToken
  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${verifyToken}">
    Нажмите для подтвержения регистрации.</a>`
  }
  sendEmail(mail)
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Подтвеждение вышло на почту'
  })
}

module.exports = sendVerifyToken
