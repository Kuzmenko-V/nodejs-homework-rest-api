const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    require: true
  }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema
}
