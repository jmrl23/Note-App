const router = require('express').Router()

router

  .post('/update-password', async (req, res) => {
    if (!req.session.userId) {
      return res.json({ error: 'no session' })
    }
    const { currentPassword, newPassword } = req.body
    if (
      typeof currentPassword !== 'string' ||
      typeof newPassword !== 'string' ||
      currentPassword.length < 1 ||
      newPassword.length < 1
    ) {
      return res.json({ error: 'empty field' })
    }
    try {
      const { model } = await require('../../db')
      const { user } = model
      const document = await user.findById(req.session.userId)
      const crypto = require('crypto-js')

      if (
        !document || 
        document.auth.password !== crypto.SHA256(currentPassword + document.auth.salt).toString()
      ) {
        return res.json({ error: 'current password is incorrect' })
      }

      if (newPassword.length < 8) {
        return res.json({ error: 'password length must be at least 8 characters' })
      }

      document.auth.password = newPassword
      await document.save()
      res.json({ error: null })
    } catch (error) {
      res.json({ error: error.message })
    }
  })

module.exports = router
