const { User } = require('../../models')
const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user
  const { path: tempDir, originalname } = req.file
  const [extension] = originalname.split('.').reverse()
  const filename = `${_id}_avatar.${extension}`
  const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename)
  try {
    Jimp.read(tempDir).then(image => {
      image.resize(250, 250).writeAsync(uploadDir)
    })
    const image = path.join('avatars', filename)
    await fs.unlink(tempDir)
    await User.findByIdAndUpdate(_id, { avatarURL: image })
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL: image
      }
    })
  } catch (error) {
    await fs.unlink(tempDir)
    next(error)
  }
}

module.exports = updateAvatar
