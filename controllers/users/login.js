const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw new Unauthorized('Неправельная почта или пароль, или почта не верифицирована!')
  }
  const isCorrectPassword = bcrypt.compareSync(password, user.password)
  if (!isCorrectPassword) {
    throw new Unauthorized('Неправельная почта или пароль, или почта не верифицирована!')
  }
  if (!user.verify) {
    throw new Unauthorized('Неправельная почта или пароль, или почта не верифицирована!')
  }
  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    }
  })
}

module.exports = login
