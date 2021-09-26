const express = require('express')
const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')

const contactsOperations = require('../../model')

const joiShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.getContacts()
    res.status(200).json({
      status: 'success',
      code: 200,
      data: result
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      throw new NotFound(`Контакта с id=${contactId} не найдено`)
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: result
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeById(contactId)
    if (!result) {
      throw new NotFound(`Контакта с id=${contactId} не найдено`)
    }
    res.status(200).json(`Контакт с id=${contactId} удален успешно`)
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContactById(contactId, req.body)
    if (!result) {
      throw new NotFound(`Контакта с id=${contactId} не найдено`)
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: result
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
