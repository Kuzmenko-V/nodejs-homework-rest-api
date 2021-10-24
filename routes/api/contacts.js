const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')
router.get('/', authenticate, controllerWrapper(ctrl.getAll))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeById))

router.put('/:contactId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateById))

router.put('/:contactId/favorite', authenticate, controllerWrapper(ctrl.updateByIdFavorite))

module.exports = router
