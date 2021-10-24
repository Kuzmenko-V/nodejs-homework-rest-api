const { NotFound, BadRequest } = require('http-errors')

const { Contact } = require('../models')

const getAll = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit
  const { favorite } = req.query
  const { _id } = req.user
  let findSet
  if (!favorite) { findSet = { owner: _id } } else { findSet = { owner: _id, favorite } }
  const result = await Contact.find(findSet, '', { skip, limit: +limit }).populate('owner', 'email')
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result }
  })
}
const getById = async (req, res, next) => {
  const { _id } = req.user
  const { contactId } = req.params
  const result = await Contact.find({ owner: _id, _id: contactId }).exec()
  if (!result) {
    throw new NotFound(`Контакта с id=${contactId} не найдено`)
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result }
  })
}
const add = async (req, res, next) => {
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result }
  })
}
const removeById = async (req, res, next) => {
  const { _id } = req.user
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove({ owner: _id, _id: contactId })
  if (!result) {
    throw new NotFound(`Контакта с id=${contactId} не найдено`)
  }
  res.status(200).json(`Контакт с id=${contactId} удален успешно`)
}
const updateById = async (req, res, next) => {
  const { _id } = req.user
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate({ owner: _id, _id: contactId }, req.body, { new: true })
  if (!result) {
    throw new NotFound(`Контакта с id=${contactId} не найдено`)
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result }
  })
}
const updateByIdFavorite = async (req, res, next) => {
  const { _id } = req.user
  const favorite = req.body.favorite
  if (favorite === true || favorite === false) {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate({ owner: _id, _id: contactId }, { favorite }, { new: true })
    console.log(result)
    if (!result) {
      throw new NotFound(`Контакта с id=${contactId} не найдено`)
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result }
    })
  } else { throw new BadRequest('missing field favorite') }
}
module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateByIdFavorite
}
