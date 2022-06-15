const router = require('express').Router()

router

  .get('/logout', (req, res, next) => {
    if (!req.session.userId) {
      return res.json({ error: 'no session' })
    }
    req.session.destroy()
    res.json({ error: null })
  })

module.exports = router
