const express = require('express')

const { controllerWrapper, validation, authenticate, upload } = require('../../middlewares')
const { joiSchema } = require('../../models/user')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.register))
router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))
router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))
router.get('/current', authenticate, controllerWrapper(ctrl.current))
router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify))
router.post('/verify', controllerWrapper(ctrl.sendVerifyToken))
module.exports = router
