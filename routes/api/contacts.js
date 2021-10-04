const express = require('express')
const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const { joiShema } = require('../../models/contact')
const { Contact } = require('../../models')

router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find({})
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
    const result = await Contact.findById(contactId).exec()
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
    const result = await Contact.create(req.body)
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
    const result = await Contact.findByIdAndRemove({ _id: contactId })
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
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true })
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

router.put('/:contactId/favorite', async (req, res, next) => {
  try {
    const favorite = req.body.favorite
    if (favorite === true || favorite === false) {
      const { contactId } = req.params
      const result = await Contact.findByIdAndUpdate({ _id: contactId }, { favorite }, { new: true })
      console.log(result)
      if (!result) {
        throw new NotFound(`Контакта с id=${contactId} не найдено`)
      }
      res.status(200).json({
        status: 'success',
        code: 200,
        data: result
      })
    } else { throw new BadRequest('missing field favorite') }
  } catch (error) {
    next(error)
  }
})

module.exports = router
