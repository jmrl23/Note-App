const router = require('express').Router()

router

  .get('/fetch', async (req, res) => {
    if (!req.session.userId) {
      res.json({ error: 'no session', documents: [] })
    }

    try {
      const { model } = await require('../../db')
      const { user } = model

      const target = await user.findById(req.session.userId).populate('notes')

      if (!target) {
        return res.redirect('/user/logout')
      }

      res.json({ error: null, documents: target.notes })
    } catch (error) {
      res.status(500).json({ error: error.message, documents: [] })
    }
  })

module.exports = router
