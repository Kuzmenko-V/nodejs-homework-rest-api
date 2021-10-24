const { User } = require('../../models')
const bcrypt = require('bcryptjs')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`Пользователь ${email} уже зарегестрирован`)
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const subscription = 'starter'
  const avatarURL = gravatar.url(email)
  await User.create({ email, password: hashPassword, subscription, avatarURL })
  res.status(201).json({
    status: 'succes',
    code: 201,
    message: 'Регистрация прошла успешною',
    data: {
      user: {
        email,
        subscription
      }
    }
  })
}

module.exports = register
